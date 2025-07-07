const validator = require('html-validator');
const fs = require('fs');
const path = require('path');

describe('HTML validation', () => {
  const files = ['index.html', 'cv.html', 'freetime.html', 'contact.html'];
  files.forEach(file => {
    test(`${file} is valid HTML`, async () => {
      const html = fs.readFileSync(path.join(__dirname, '../../', file), 'utf8');
      const result = await validator({ data: html, format: 'text' });
      expect(result).not.toMatch(/Error:/);
    });
  });
});
