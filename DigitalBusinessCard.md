# MiskaB Portfolio Website – Guidance & Best Practices

This document provides an overview and guidance for the MiskaB portfolio website. You can use this as a template or reference for building similar personal/professional web portfolios. It highlights the best features, explains the structure, and provides tips for reuse and extension.

---

## 📁 Project Structure

```
/ (root)
├── index.html           # Home page with randomized flying images
├── cv.html              # CV/Professional timeline with sliding sections
├── freetime.html        # Personal interests and gallery
├── contact.html         # Contact form and info
├── images/              # All images used in the site
│   └── ...              # (profile, logos, gallery, etc.)
└── MiskaB.code-workspace# VS Code workspace settings
```

---

## 🌐 How the Website is Built

- **Static HTML/CSS/JS**: No frameworks, just clean HTML, CSS, and a bit of vanilla JavaScript for interactivity.
- **Responsive Design**: All pages are mobile-friendly and adapt to different screen sizes.
- **Consistent Navigation**: A stylish, adaptive left-hand navigation bar is present on every page for easy movement.
- **Image Hosting**: Images are loaded from the `/images/` folder or directly from the GitHub repository (for easy CDN-like access).

---

## 🏆 Best Features & How They Work

### 1. Randomized Flying Images on the Front Page (`index.html`)

- **Purpose**: Creates a dynamic, visually engaging landing page.
- **How**: JavaScript randomly selects and animates a subset of images to fly in from the top.

```js
// ...existing code...
const images = document.querySelectorAll('.flying-images img');
const shuffled = Array.from(images).sort(() => 0.5 - Math.random());
const selected = shuffled.slice(0, 6);
const unselected = shuffled.slice(6);
unselected.forEach(img => img.style.display = 'none');
// ...existing code...
```

- **Tip**: You can easily swap out the images or adjust the animation for your own style.

### 2. Sliding CV/Professional Timeline (`cv.html`)

- **Purpose**: Presents work experience in a modern, interactive way.
- **How**: Each job/section slides in as you scroll, with a fixed timeline dot navigation for quick jumps.

```html
<!-- Timeline Dots -->
<div class="timeline-dots">
  <a href="#eficode" id="dot-1"></a>
  <a href="#crayon" id="dot-2"></a>
  <a href="#pedibm" id="dot-3"></a>
</div>
```

```js
// ...existing code...
const sections = document.querySelectorAll('section');
const dots = document.querySelectorAll('.timeline-dots a');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const id = entry.target.id;
      dots.forEach(dot => {
        dot.classList.toggle('active', dot.getAttribute('href').includes(id));
      });
    }
  });
}, { threshold: 0.6 });
sections.forEach(sec => observer.observe(sec));
// ...existing code...
```

- **Tip**: Add or remove sections as needed. The observer will handle the animation and dot highlighting.

### 3. Adaptive Left-Hand Navigation Bar (All Pages)

- **Purpose**: Provides a consistent, modern navigation experience.
- **How**: Uses CSS for vertical navigation on desktop and horizontal on mobile.

```css
nav {
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0 10px 10px 0;
  padding: 1em 0.5em;
  backdrop-filter: blur(5px);
  transition: background 0.3s;
}
@media (max-width: 768px) {
  nav {
    top: unset;
    bottom: 0;
    left: 0;
    right: 0;
    transform: none;
    border-radius: 10px 10px 0 0;
    padding: 0.5em;
  }
  nav ul {
    flex-direction: row;
    justify-content: space-around;
  }
  nav ul li a {
    writing-mode: horizontal-tb;
    transform: none;
    font-size: 0.9rem;
  }
}
```

- **Tip**: The navigation is easy to extend—just add new `<li><a href="..."></a></li>` items.

---

## 📝 How to Reuse or Extend

- **To use in another repo**: Copy the HTML files, the `images/` folder, and this guide. Update image paths and content as needed.
- **To add new sections**: Duplicate a section in the HTML, update IDs and navigation.
- **To change images**: Replace files in `/images/` and update references in HTML.
- **To customize styles**: Edit the `<style>` blocks in each HTML file.

---

## 💡 General Tips

- Keep images optimized for web (JPG/PNG, reasonable size).
- Use consistent navigation and color themes for a professional look.
- Comment your code for easier maintenance.
- Test on both desktop and mobile for responsiveness.

---

## 📦 Export/Import Instructions

1. Copy all HTML files and the `images/` folder to your new repository.
2. Add this guidance file as `README.md` or `GUIDE.md`.
3. Open `index.html` in your browser to verify everything works.
4. Update content, images, and links as needed for your new project.

---

Feel free to reach out or fork this project for your own use!