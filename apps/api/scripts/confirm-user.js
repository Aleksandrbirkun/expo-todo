const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../../.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function confirmUser() {
  // Update the user to be confirmed
  const { data, error } = await supabase.auth.admin.updateUserById(
    '49b74087-41ac-4228-a022-9999c26fc25f',
    { email_confirmed_at: new Date().toISOString() }
  );

  if (error) {
    console.error('Error confirming user:', error);
  } else {
    console.log('User confirmed successfully');
  }
}

confirmUser();