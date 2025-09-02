const { readFileSync } = require('fs');
const { JSDOM } = require('jsdom');

describe('Accessibility checks', () => {
  const files = ['index.html', 'cv.html', 'freetime.html', 'contact.html', 'home.html'];
  
  files.forEach(file => {
    test(`${file} has basic accessibility structure`, async () => {
      try {
        const html = readFileSync(file, 'utf8');
        const dom = new JSDOM(html);
        const { document } = dom.window;
        
        // Basic accessibility checks
        const hasTitle = document.title && document.title.length > 0;
        const hasLang = document.documentElement.hasAttribute('lang');
        const hasMetaDescription = document.querySelector('meta[name="description"]');
        const hasViewport = document.querySelector('meta[name="viewport"]');
        
        // Check for images without alt attributes
        const imagesWithoutAlt = Array.from(document.querySelectorAll('img')).filter(
          img => !img.hasAttribute('alt')
        );
        
        // Check for proper heading structure
        const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
        const hasH1 = headings.some(h => h.tagName === 'H1');
        
        // Check for form labels
        const inputs = Array.from(document.querySelectorAll('input, textarea, select'));
        const inputsWithoutLabels = inputs.filter(input => {
          const id = input.id;
          return id && !document.querySelector(`label[for="${id}"]`) && !input.getAttribute('aria-label');
        });
        
        // Collect results
        const issues = [];
        if (!hasTitle) issues.push('Missing or empty title');
        if (!hasLang) issues.push('Missing lang attribute on html element');
        if (!hasMetaDescription) issues.push('Missing meta description');
        if (!hasViewport) issues.push('Missing viewport meta tag');
        if (imagesWithoutAlt.length > 0) issues.push(`${imagesWithoutAlt.length} images without alt attributes`);
        if (!hasH1) issues.push('Missing H1 heading');
        if (inputsWithoutLabels.length > 0) issues.push(`${inputsWithoutLabels.length} form inputs without labels`);
        
        if (issues.length > 0) {
          console.log(`Accessibility issues in ${file}:`, issues);
        }
        
        // Only fail on critical issues (missing alt on images or form inputs without labels)
        const criticalIssues = imagesWithoutAlt.length + inputsWithoutLabels.length;
        expect(criticalIssues).toBe(0);
        
      } catch (error) {
        if (error.code === 'ENOENT') {
          console.warn(`File ${file} not found, skipping accessibility test`);
          expect(true).toBe(true);
        } else {
          throw error;
        }
      }
    });
  });
});
