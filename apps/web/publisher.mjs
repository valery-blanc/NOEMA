// NOÊMA — service « publisher ».
// Reconstruit le site statique Astro à la demande, vers deux cibles :
//   - public  → /out/public  (volume servi par nginx « web » = prod)
//   - preview → /out/preview (volume servi par nginx « preview » = aperçu)
// Au démarrage : attend le CMS puis construit les deux cibles.
// Expose POST /build/public et /build/preview (protégés par x-token) + /health.
import http from 'node:http'
import { spawn } from 'node:child_process'
import { cpSync, rmSync, mkdirSync, readdirSync } from 'node:fs'
import { join } from 'node:path'

const PORT = 9000
const TOKEN = process.env.PUBLISH_TOKEN || ''
const CMS = process.env.CMS_INTERNAL_URL || 'http://cms:3000'
const SITE_URL = {
  public: process.env.PUBLIC_SITE_URL || 'http://localhost',
  preview: process.env.PREVIEW_SITE_URL || 'http://localhost',
}
const OUT = { public: '/out/public', preview: '/out/preview' }

let ready = false
let chain = Promise.resolve() // sérialise les builds (un seul à la fois)

const log = (...a) => console.log('[publisher]', ...a)

function runBuild(target) {
  return new Promise((resolve, reject) => {
    log(`build ${target} (site=${SITE_URL[target]})…`)
    const child = spawn('pnpm', ['run', 'build'], {
      env: { ...process.env, CMS_INTERNAL_URL: CMS, PUBLIC_SITE_URL: SITE_URL[target] },
      stdio: 'inherit',
    })
    child.on('exit', (code) => {
      if (code !== 0) return reject(new Error(`astro build a échoué (${code})`))
      try {
        // Vider le CONTENU du dossier (sans supprimer le point de montage du volume).
        mkdirSync(OUT[target], { recursive: true })
        for (const entry of readdirSync(OUT[target])) {
          rmSync(join(OUT[target], entry), { recursive: true, force: true })
        }
        cpSync('dist', OUT[target], { recursive: true })
        log(`publié → ${OUT[target]}`)
        resolve()
      } catch (e) {
        reject(e)
      }
    })
  })
}

// File d'attente : enchaîne les builds pour éviter les conflits sur ./dist.
function enqueue(target) {
  chain = chain.then(
    () => runBuild(target),
    () => runBuild(target),
  )
  return chain
}

async function waitForCms() {
  for (let i = 0; i < 60; i++) {
    try {
      const r = await fetch(`${CMS}/api/access`)
      if (r.ok) return
    } catch {}
    await new Promise((r) => setTimeout(r, 3000))
  }
  log('CMS non prêt après ~3 min — build quand même.')
}

http
  .createServer(async (req, res) => {
    if (req.url === '/health') {
      res.writeHead(ready ? 200 : 503)
      return res.end(ready ? 'ok' : 'starting')
    }
    if (req.method === 'POST' && req.url?.startsWith('/build/')) {
      if (TOKEN && req.headers['x-token'] !== TOKEN) {
        res.writeHead(403)
        return res.end('forbidden')
      }
      const target = req.url.endsWith('/public') ? 'public' : 'preview'
      try {
        await enqueue(target)
        res.writeHead(200, { 'content-type': 'application/json' })
        res.end(JSON.stringify({ ok: true, target }))
      } catch (e) {
        res.writeHead(500)
        res.end(String(e))
      }
      return
    }
    res.writeHead(404)
    res.end()
  })
  .listen(PORT, () => log(`écoute sur :${PORT}`))

// Build initial des deux cibles au démarrage.
;(async () => {
  await waitForCms()
  try {
    await enqueue('public')
    await enqueue('preview')
  } catch (e) {
    log('build initial en erreur :', e)
  }
  ready = true
  log('prêt.')
})()
