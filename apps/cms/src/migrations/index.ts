import * as migration_20260616_083813_initial from './20260616_083813_initial';

export const migrations = [
  {
    up: migration_20260616_083813_initial.up,
    down: migration_20260616_083813_initial.down,
    name: '20260616_083813_initial'
  },
];
