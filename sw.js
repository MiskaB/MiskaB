const CACHE_NAME = 'miska-braun-portfolio-v1';
const urlsToCache = [
  '/MiskaB/',
  '/MiskaB/index.html',
  '/MiskaB/home.html',
  '/MiskaB/cv.html',
  '/MiskaB/freetime.html',
  '/MiskaB/contact.html',
  '/MiskaB/main.js',
  '/MiskaB/images/AI_2025_Sky.png',
  '/MiskaB/images/AppleTouchIcon.png',
  '/MiskaB/images/Profile_2025.jpeg',
  '/MiskaB/images/profile2.jpeg',
  '/MiskaB/images/MiskaBraun_CV.pdf',
  '/MiskaB/images/icehockey.jpg',
  '/MiskaB/images/travel.jpg',
  '/MiskaB/images/car.jpg',
  '/MiskaB/images/Family_miska.PNG',
  '/MiskaB/images/Eficode_logo.png',
  '/MiskaB/images/Craoyn_logo.png',
  '/MiskaB/images/Pedab_logo.png',
  '/MiskaB/images/IBM_logo.png'
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