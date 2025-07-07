# Unit Testing JavaScript (Jest)

Your project currently has JavaScript embedded in HTML files. For best-practice unit testing with Jest:

- Move reusable JavaScript logic (e.g., random image selection, DOM manipulation functions) into separate `.js` files in your project root or a `js/` folder.
- Import those functions into your test files in `tests/unit/` and write Jest tests for them.

Example:
```js
// In main.js
export function add(a, b) { return a + b; }
```
```js
// In tests/unit/main.test.js
import { add } from '../../main.js';
test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

For now, this folder is a placeholder until you extract JS logic from your HTML files.
