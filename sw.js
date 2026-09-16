const CACHE_NAME = 'miska-braun-portfolio-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/home.html',
  '/cv.html',
  '/freetime.html',
  '/contact.html',
  '/blogs.html',
  '/games.html',
  '/tetris.html',
  '/SpaceStrike.html',
  '/RetroBounce.html',
  '/styles.css',
  '/shared.js',
  '/main.js',
  '/images/AI_2025_Sky.png',
  '/images/AppleTouchIcon.png',
  '/images/Profile_2025.jpeg',
  '/images/profile2.jpeg',
  '/images/MiskaBraun_CV.pdf',
  '/images/icehockey.jpg',
  '/images/travel.jpg',
  '/images/car.jpg',
  '/images/Family_miska.PNG',
  '/images/Eficode_logo.png',
  '/images/Craoyn_logo.png',
  '/images/Pedab_logo.png',
  '/images/IBM_logo.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names =>
      Promise.all(names.filter(n => n !== CACHE_NAME).map(n => caches.delete(n)))
    )
  );
});
