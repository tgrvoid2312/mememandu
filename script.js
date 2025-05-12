// script.js
const SUPABASE_URL = 'https://ooaqzetkrmpgbdjtmacx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9vYXF6ZXRrcm1wZ2JkanRtYWN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNzM0NTMsImV4cCI6MjA2MjY0OTQ1M30.61KJeapWZBAN4tYKTaN8PGTeUCwzs0aJ_3HleZjE4ik';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Function to upload meme
async function uploadMeme(event) {
  event.preventDefault();

  const fileInput = document.getElementById('fileInput');
  const keywordsInput = document.getElementById('keywordsInput');
  const typeInput = document.getElementById('typeInput');
  const statusElement = document.getElementById('uploadStatus');

  const file = fileInput.files[0];
  const keywords = keywordsInput.value.split(',').map(keyword => keyword.trim());
  const type = typeInput.value;

  if (!file) {
    statusElement.innerHTML = '<p style="color: red;">Please select a file.</p>';
    return;
  }

  try {
    // Upload the file to Supabase storage
    const { data, error: uploadError } = await client
      .storage
      .from('memes')
      .upload(`memes/${file.name}`, file, { cacheControl: '3600', upsert: true });

    if (uploadError) {
      throw uploadError;
    }

    // Get the file's URL
    const fileUrl = `${SUPABASE_URL}/storage/v1/object/public/memes/${data.path}`;

    // Insert meme data into the database
    const { data: memeData, error: insertError } = await client
      .from('memes')
      .insert([
        { url: fileUrl, keywords: keywords, type: type }
      ]);

    if (insertError) {
      throw insertError;
    }

    statusElement.innerHTML = `<p style="color: green;">Meme uploaded successfully!</p>`;
    fileInput.value = '';  // Clear the input
    keywordsInput.value = '';  // Clear keywords input
  } catch (error) {
    statusElement.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

// Function to search for memes by keyword
async function searchMemes(type) {
  const searchInput = type === 'image' ? document.getElementById('imageSearchInput') : document.getElementById('videoSearchInput');
  const searchKeyword = searchInput.value.trim();
  const resultsContainer = type === 'image' ? document.getElementById('imageResults') : document.getElementById('videoResults');

  if (!searchKeyword) {
    resultsContainer.innerHTML = '<p>Please enter a search keyword.</p>';
    return;
  }

  try {
    const { data, error } = await client
      .from('memes')
      .select('*')
      .ilike('keywords', `%${searchKeyword}%`)
      .eq('type', type);

    if (error) {
      resultsContainer.innerHTML = `<p style="color: red;">Error searching memes: ${error.message}</p>`;
      return;
    }

    if (data.length === 0) {
      resultsContainer.innerHTML = `<p>No memes found for "${searchKeyword}"</p>`;
      return;
    }

    let resultsHTML = '<div>';
    data.forEach(meme => {
      resultsHTML += `
        <div class="meme-card">
          <img src="${meme.url}" alt="Meme" width="100">
          <p>Keywords: ${meme.keywords.join(', ')}</p>
        </div>
      `;
    });
    resultsHTML += '</div>';

    resultsContainer.innerHTML = resultsHTML;
  } catch (error) {
    resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}
