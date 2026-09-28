// ==========================================================
// ARKOBOMBS SUPABASE CONNECTION
// Shared by Teacher & Student Portal
// ==========================================================

const SUPABASE_URL = "https://mquxdrjgnrlduaswnlph.supabase.co";

const SUPABASE_ANON_KEY =
"YOUR_SUPABASE_ANON_KEY_HERE";

const db = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);