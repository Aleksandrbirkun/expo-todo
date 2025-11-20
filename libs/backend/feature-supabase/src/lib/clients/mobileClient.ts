import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { mobileConfig } from '@shared/configs/lib/supabase';

export const mobileClient = createClient(
  mobileConfig.supabase.url,
  mobileConfig.supabase.anonKey,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);
