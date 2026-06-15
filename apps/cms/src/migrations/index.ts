import * as migration_20260615_184405_initial from './20260615_184405_initial';

export const migrations = [
  {
    up: migration_20260615_184405_initial.up,
    down: migration_20260615_184405_initial.down,
    name: '20260615_184405_initial'
  },
];
