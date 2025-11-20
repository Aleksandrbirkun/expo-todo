import { createServerClient } from '../clients/serverClient';

export async function getServerAccessToken() {
  const sb = await createServerClient();
  const { data } = await sb.auth.getSession();
  return data.session?.access_token ?? '';
}
