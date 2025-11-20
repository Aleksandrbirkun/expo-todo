import { createBrowserClient } from '../clients/browserClient';

export async function getClientAccessToken() {
  const sb = createBrowserClient();
  const { data } = await sb.auth.getSession();
  return data.session?.access_token ?? '';
}
