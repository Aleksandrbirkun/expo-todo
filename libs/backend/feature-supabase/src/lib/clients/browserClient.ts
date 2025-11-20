import { createBrowserClient as browserClient } from '@supabase/ssr';
import { config } from '@shared/configs/lib/supabase';

export function createBrowserClient() {
  return browserClient(config.supabase.url, config.supabase.anonKey);
}
