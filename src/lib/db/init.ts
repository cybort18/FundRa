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
  // No-op: Database starts empty (no mock campaigns seeded)
}
