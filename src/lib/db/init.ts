/**
 * FundRa — Database Initialization Helper
 *
 * Ensures the database exists and contains seed data
 * on the very first API call. Subsequent calls are no-ops.
 */

import { readDb, writeDb } from "./engine";
import { SEED_CAMPAIGNS } from "./seed";

let initialized = false;

export function ensureDb(): void {
  if (initialized) return;

  const db = readDb();

  // Seed only if database is completely empty
  if (db.campaigns.length === 0) {
    db.campaigns = [...SEED_CAMPAIGNS];
    writeDb(db);
  }

  initialized = true;
}
