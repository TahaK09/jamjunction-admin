import { createClient } from "@supabase/supabase-js";

const SupaBaseURL = import.meta.env.VITE_SUPABASE_URL;
const SupaBaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Safety check for missing env variables
if (!SupaBaseURL || !SupaBaseKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env file."
  );
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(SupaBaseURL, SupaBaseKey);
