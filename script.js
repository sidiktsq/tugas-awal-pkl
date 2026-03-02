/**
 * Portfolio Main Script
 * Handles LocalStorage, DOM Manipulation, and API Fetching
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  handleHome();
  handleContact();
  handleBlog();
});

// --- Theme Toggle ---
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle');
  if (!themeBtn) return;

  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeBtn.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

// --- Home Page Logic ---
function handleHome() {
  const welcomeMsg = document.getElementById('welcome-msg');
  const displayName = document.getElementById('display-name');
  if (!welcomeMsg) return;

  // Check if name exists in localStorage
  const savedName = localStorage.getItem('userName');
  if (savedName) {
    welcomeMsg.innerText = `Welcome back, ${savedName}!`;
    displayName.innerText = savedName;
  }
}

// --- Contact Page Logic ---
function handleContact() {
  const form = document.getElementById('contact-form');
  const displayArea = document.getElementById('display-area');
  
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values using getElementById
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    // Display data below using innerText/innerHTML (DOM Manipulation)
    document.getElementById('res-name').innerText = name;
    document.getElementById('res-email').innerText = email;
    document.getElementById('res-msg').innerText = message;

    // Show the display area
    displayArea.style.display = 'block';

    // Save name to localStorage (to be shown on Home page)
    localStorage.setItem('userName', name);

    // Optional: Reset form
    form.reset();

    // Smooth scroll to display area
    displayArea.scrollIntoView({ behavior: 'smooth' });
  });
}

// --- Blog Page Logic (API Fetch) ---
async function handleBlog() {
  const blogContainer = document.getElementById('blog-posts');
  if (!blogContainer) return;

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    if (!response.ok) throw new Error('Failed to fetch posts');
    
    const posts = await response.json();
    
    // Clear loading message
    blogContainer.innerHTML = '';

    posts.forEach(post => {
      const postCard = document.createElement('article');
      postCard.className = 'post-card';
      postCard.innerHTML = `
        <h3 style="text-transform: capitalize; margin-bottom: 0.5rem; color: var(--primary);">${post.title}</h3>
        <p style="color: var(--text-light);">${post.body}</p>
      `;
      blogContainer.appendChild(postCard);
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    blogContainer.innerHTML = `<p style="color: red;">Error loading posts: ${error.message}</p>`;
  }
}
