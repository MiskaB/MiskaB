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

// Export for unit testing
if (typeof module !== 'undefined') {
  module.exports = { openFullscreen };
}
