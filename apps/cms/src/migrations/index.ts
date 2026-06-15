import * as migration_20260615_123301_initial from './20260615_123301_initial';

export const migrations = [
  {
    up: migration_20260615_123301_initial.up,
    down: migration_20260615_123301_initial.down,
    name: '20260615_123301_initial'
  },
];
