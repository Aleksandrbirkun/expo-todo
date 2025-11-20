'use client';
import { client } from '../generated/client.gen';
import { getMobileAccessToken } from '@backend/feature-supabase/lib/utils/mobile-token';

client.setConfig({
  baseURL: process.env?.EXPO_PUBLIC_API_BASE_URL ?? 'http://localhost:3001',
  auth: async () => {
    return await getMobileAccessToken();
  },
});
