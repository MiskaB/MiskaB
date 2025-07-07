const { JSDOM } = require('jsdom');
const { openFullscreen } = require('../../main');

describe('openFullscreen', () => {
  let dom, document, imgElem, fullscreen, fullscreenImg;

  beforeEach(() => {
    dom = new JSDOM(`
      <body>
        <div id="fullscreen" class="fullscreen-img"><img id="fullscreen-img" src="" /></div>
      </body>
    `, { url: 'http://localhost/' });
    document = dom.window.document;
    // Mock image element
    imgElem = document.createElement('img');
    imgElem.src = 'test.jpg';
    // Attach to global for function
    global.document = document;
    fullscreen = document.getElementById('fullscreen');
    fullscreenImg = document.getElementById('fullscreen-img');
  });

  afterEach(() => {
    delete global.document;
  });

  it('sets fullscreen image src and shows fullscreen', () => {
    openFullscreen(imgElem);
    expect(fullscreenImg.src).toContain('test.jpg');
    expect(fullscreen.classList.contains('active')).toBe(true);
  });

  it('removes fullscreen on click and clears src', () => {
    openFullscreen(imgElem);
    fullscreen.click();
    expect(fullscreen.classList.contains('active')).toBe(false);
    // Accept both "" and "http://localhost/" as valid in jsdom
    expect(['', 'http://localhost/']).toContain(fullscreenImg.src);
  });
});
