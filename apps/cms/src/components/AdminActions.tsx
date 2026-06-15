'use client'
import { Button, toast } from '@payloadcms/ui'
import React, { useState } from 'react'

// Déclenche le rebuild du site public (prod).
export const PublishButton = () => {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/publish', { method: 'POST', credentials: 'include' })
      if (!res.ok) throw new Error()
      toast.success('Site publié.')
    } catch {
      toast.error('Échec de la publication.')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button buttonStyle="primary" size="small" onClick={onClick} disabled={loading}>
      {loading ? 'Publication…' : 'Publier'}
    </Button>
  )
}

// Reconstruit le site d'aperçu (contenu sauvegardé) et l'ouvre dans un nouvel onglet.
export const PreviewButton = () => {
  const [loading, setLoading] = useState(false)
  const onClick = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/preview', { method: 'POST', credentials: 'include' })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error()
      toast.success('Aperçu prêt.')
      if (data?.url) window.open(data.url, '_blank', 'noopener')
    } catch {
      toast.error("Échec de l'aperçu.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button buttonStyle="secondary" size="small" onClick={onClick} disabled={loading}>
      {loading ? 'Aperçu…' : 'Aperçu'}
    </Button>
  )
}
