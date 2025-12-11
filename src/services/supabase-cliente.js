import { createClient } from '@supabase/supabase-js';


const supabaseURL = "https://cmvtnavjqbzfwwhutsxv.supabase.co";
const supabaseKEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtdnRuYXZqcWJ6Znd3aHV0c3h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODMzOTEsImV4cCI6MjA4MDg1OTM5MX0.fduN7oOgP2WSMVrbDlDw1FU-4jfICZOpluyqIMXhifo";

const supabase = createClient(supabaseURL,supabaseKEY)

export default supabase;