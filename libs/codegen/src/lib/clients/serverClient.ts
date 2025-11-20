import 'server-only';
import { client } from '../generated/client.gen';
import { getServerAccessToken } from '@backend/feature-supabase/lib/utils/server-token';

client.setConfig({
  baseURL: process.env?.['NEXT_PUBLIC_API_BASE_URL'] ?? 'http://localhost:3001',
  auth: async () => {
    return await getServerAccessToken();
  },
  // Optional: Next.js server fetch controls
  // cache: 'no-store',
  // next: { revalidate: 60 },
});
