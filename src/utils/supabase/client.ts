    
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL = https://mieqscvyqpdgagqjwazi.supabase.co ; 
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY = sb_publishable_Fh2JkitEAHC0IV3t9tGPYQ_yKM80uEB;

export const supabaseBrowserClient = createBrowserClient(
  supabaseUrl!,
  supabaseKey!,
);
