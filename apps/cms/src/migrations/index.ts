import * as migration_20260616_102922_initial from './20260616_102922_initial';

export const migrations = [
  {
    up: migration_20260616_102922_initial.up,
    down: migration_20260616_102922_initial.down,
    name: '20260616_102922_initial'
  },
];
