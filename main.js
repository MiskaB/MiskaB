// Fullscreen gallery logic extracted from freetime.html for unit testing
function openFullscreen(imgElem) {
  const fullscreen = document.getElementById('fullscreen');
  const fullscreenImg = document.getElementById('fullscreen-img');
  fullscreenImg.src = imgElem.src;
  fullscreen.classList.add('active');
  fullscreen.onclick = function () {
    fullscreen.classList.remove('active');
    fullscreenImg.src = '';
  };
}

// Theme toggle functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  
  // Update button text and icon
  const themeText = document.querySelector('.theme-text');
  const themeIcon = document.querySelector('.theme-icon');
  if (themeText) themeText.textContent = newTheme === 'light' ? 'Dark' : 'Light';
  if (themeIcon) themeIcon.textContent = newTheme === 'light' ? '☀️' : '🌙';
  
  localStorage.setItem('theme', newTheme);
}

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeText = document.querySelector('.theme-text');
  const themeIcon = document.querySelector('.theme-icon');
  if (themeText) themeText.textContent = savedTheme === 'light' ? 'Dark' : 'Light';
  if (themeIcon) themeIcon.textContent = savedTheme === 'light' ? '☀️' : '🌙';
}

// PWA Service Worker Registration
function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    });
  }
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Initialize on page load
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    loadTheme();
    registerServiceWorker();
  });
}

// Export for unit testing
if (typeof module !== 'undefined') {
  module.exports = { openFullscreen, toggleTheme, loadTheme, scrollToTop };
}
