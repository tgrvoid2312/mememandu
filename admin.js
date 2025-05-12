// admin.js
const SUPABASE_URL = 'https://ooaqzetkrmpgbdjtmacx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXF6ZXRrcm1wZ2JkanRtYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzM0NTMsImV4cCI6MjA2MjY0OTQ1M30.61KJeapWZBAN4tYKTaN8PGTeUCwzs0aJ_3HleZjE4ik';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Admin credentials (hardcoded for now)
const ADMIN_USERNAME = 'sujal6969';
const ADMIN_PASSWORD = 'sujal@8042';

function handleAdminLogin(event) {
  event.preventDefault();

  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;
  const statusElement = document.getElementById('loginStatus');

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    // Redirect to admin dashboard
    window.location.href = 'dashboard.html';
  } else {
    statusElement.innerHTML = '<p style="color: red;">Invalid credentials. Please try again.</p>';
  }
}
