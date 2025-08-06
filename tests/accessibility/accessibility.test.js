const { readFileSync } = require('fs');
const { JSDOM } = require('jsdom');
const axe = require('axe-core');

describe('Accessibility checks', () => {
  const files = ['index.html', 'cv.html', 'freetime.html', 'contact.html'];
  files.forEach(file => {
    test(`${file} has no critical accessibility violations`, async () => {
      const html = readFileSync(file, 'utf8');
      const dom = new JSDOM(html, { 
        url: 'http://localhost/',
        pretendToBeVisual: true,
        resources: 'usable'
      });
      const { window } = dom;
      
      // Set up global objects for axe
      global.window = window;
      global.document = window.document;
      
      const results = await axe.run(window.document);
      const critical = results.violations.filter(v => v.impact === 'critical');
      
      // Clean up globals
      delete global.window;
      delete global.document;
      
      expect(critical.length).toBe(0);
    });
  });
});
