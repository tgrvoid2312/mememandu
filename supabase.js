// supabase.js
const SUPABASE_URL = 'https://ooaqzetkrmpgbdjtmacx.supabase.co'; // Replace with your Supabase URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXF6ZXRrcm1wZ2JkanRtYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzM0NTMsImV4cCI6MjA2MjY0OTQ1M30.61KJeapWZBAN4tYKTaN8PGTeUCwzs0aJ_3HleZjE4ik'; // Replace with your Supabase API Key

const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
