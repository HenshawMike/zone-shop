import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Create a Supabase client for server-side data fetching during build time.
export const createClient = () => {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
};
