// dashboard.js
const SUPABASE_URL = 'https://ooaqzetkrmpgbdjtmacx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXF6ZXRrcm1wZ2JkanRtYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzM0NTMsImV4cCI6MjA2MjY0OTQ1M30.61KJeapWZBAN4tYKTaN8PGTeUCwzs0aJ_3HleZjE4ik';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadMemes() {
  const { data, error } = await client
    .from('memes')
    .select('*')
    .order('created_at', { ascending: false });

  const memeListElement = document.getElementById('memeList');
  
  if (error) {
    memeListElement.innerHTML = `<p style="color: red;">Error loading memes: ${error.message}</p>`;
    return;
  }

  if (data.length === 0) {
    memeListElement.innerHTML = '<p>No memes found.</p>';
    return;
  }

  let memeHTML = '<ul>';
  data.forEach(meme => {
    memeHTML += `
      <li>
        <div>
          <img src="${meme.url}" alt="Meme" width="100">
          <p>${meme.keywords.join(', ')}</p>
          <button onclick="deleteMeme('${meme.id}')">Delete</button>
        </div>
      </li>
    `;
  });
  memeHTML += '</ul>';
  memeListElement.innerHTML = memeHTML;
}

async function deleteMeme(memeId) {
  const { error } = await client
    .from('memes')
    .delete()
    .eq('id', memeId);

  if (error) {
    alert('Error deleting meme');
    return;
  }

  // Reload memes after deletion
  loadMemes();
}
