import * as migration_20260615_210704_initial from './20260615_210704_initial';

export const migrations = [
  {
    up: migration_20260615_210704_initial.up,
    down: migration_20260615_210704_initial.down,
    name: '20260615_210704_initial'
  },
];
