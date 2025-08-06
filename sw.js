const CACHE_NAME = 'miska-braun-portfolio-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/cv.html',
  '/freetime.html',
  '/contact.html',
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

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});