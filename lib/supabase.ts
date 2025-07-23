import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
// This function creates a Supabase client with the necessary authentication token
// to interact with the Supabase backend securely.

export const createSupabaseClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      async accessToken() {
        return (await auth()).getToken();
      },
    }
  );
};
