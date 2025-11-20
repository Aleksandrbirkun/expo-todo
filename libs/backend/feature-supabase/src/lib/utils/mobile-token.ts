import { mobileClient } from '../clients/mobileClient';

export async function getMobileAccessToken() {
  const sb = mobileClient;
  const { data } = await sb.auth.getSession();
  return data.session?.access_token ?? '';
}
