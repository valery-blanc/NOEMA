import * as migration_20260615_123301_initial from './20260615_123301_initial';
import * as migration_20260615_133206_add_nav_fields from './20260615_133206_add_nav_fields';

export const migrations = [
  {
    up: migration_20260615_123301_initial.up,
    down: migration_20260615_123301_initial.down,
    name: '20260615_123301_initial',
  },
  {
    up: migration_20260615_133206_add_nav_fields.up,
    down: migration_20260615_133206_add_nav_fields.down,
    name: '20260615_133206_add_nav_fields'
  },
];
