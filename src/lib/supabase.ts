import { createClient, SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * Supabase browser client.
 *
 * Returns `null` when the env vars are not set, so the app still builds and the
 * forms can gracefully fall back (e.g. to WhatsApp) until Supabase is configured.
 * The ANON key is safe to ship to the browser — access is controlled by Row Level
 * Security policies on the database (see supabase/schema.sql).
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey) : null;

export const isSupabaseConfigured = Boolean(url && anonKey);
