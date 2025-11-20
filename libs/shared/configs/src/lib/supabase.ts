export const config = {
  api: {
    url: process.env['NEXT_PUBLIC_API_URL'] || 'http://localhost:3001/api',
  },
  supabase: {
    url: process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    anonKey: process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']!,
  },
} as const;

export const mobileConfig = {
  api: {
    url: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  },
  supabase: {
    url: process.env.EXPO_PUBLIC_SUPABASE_URL,
    anonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
  },
} as const;
