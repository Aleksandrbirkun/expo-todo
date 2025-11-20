import { mobileClient } from '../clients/mobileClient';

/**
 * Get the access token from the mobile Supabase session
 * Used for authenticating API requests from the mobile app
 */
export async function getMobileAccessToken(): Promise<string | undefined> {
  try {
    const { data: { session } } = await mobileClient.auth.getSession();
    if (session?.access_token) {
      return `Bearer ${session.access_token}`;
    }
    return undefined;
  } catch (error) {
    console.error('Error getting mobile access token:', error);
    return undefined;
  }
}