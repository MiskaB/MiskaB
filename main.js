// Fullscreen gallery logic — also used by unit tests (tests/unit/main.test.js)
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

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

if (typeof module !== 'undefined') {
  module.exports = { openFullscreen, scrollToTop };
}
