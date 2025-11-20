'use client';
import { client } from '../generated/client.gen';
import { getClientAccessToken } from '@backend/feature-supabase/lib/utils/client-token';

client.setConfig({
  baseURL: process.env?.['NEXT_PUBLIC_API_BASE_URL'] ?? 'http://localhost:3001',
  auth: async () => {
    return await getClientAccessToken();
  },
});
