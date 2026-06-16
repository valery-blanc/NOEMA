import * as migration_20260616_102922_initial from './20260616_102922_initial';
import * as migration_20260616_120000_add_hero_rich from './20260616_120000_add_hero_rich';
import * as migration_20260616_130000_drop_hero_rich from './20260616_130000_drop_hero_rich';

export const migrations = [
  {
    up: migration_20260616_102922_initial.up,
    down: migration_20260616_102922_initial.down,
    name: '20260616_102922_initial'
  },
  {
    up: migration_20260616_120000_add_hero_rich.up,
    down: migration_20260616_120000_add_hero_rich.down,
    name: '20260616_120000_add_hero_rich'
  },
  {
    up: migration_20260616_130000_drop_hero_rich.up,
    down: migration_20260616_130000_drop_hero_rich.down,
    name: '20260616_130000_drop_hero_rich'
  },
];
