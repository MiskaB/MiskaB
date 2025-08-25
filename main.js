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
    registerServiceWorker();
  });
}

// Export for unit testing
if (typeof module !== 'undefined') {
  module.exports = { openFullscreen, scrollToTop };
}
