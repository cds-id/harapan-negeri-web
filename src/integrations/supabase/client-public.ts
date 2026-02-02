// A "safe" Supabase client that does not hard-fail when Vite env vars are not injected.
// NOTE: The URL + anon key are public values (safe to ship to the browser).
// We still prefer env vars when available.

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const FALLBACK_PROJECT_ID = 'zklwlnjjikoyrcwflmem';
const FALLBACK_URL = `https://${FALLBACK_PROJECT_ID}.supabase.co`;
const FALLBACK_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InprbHdsbmpqaWtveXJjd2ZsbWVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAwMDE3MDYsImV4cCI6MjA4NTU3NzcwNn0.XfQBVj_zMttvTFJtyKK8CtGo-egIae_dozyYDkaFFiM';

const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID || FALLBACK_PROJECT_ID;
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || `https://${projectId}.supabase.co` || FALLBACK_URL;
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  },
});
