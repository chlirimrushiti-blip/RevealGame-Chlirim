const CACHE_NAME = 'qix-reveal-v1';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './level1.jpg',
  './level2.jpg',
  './level3.jpg',
  './level4.jpg',
  './level5.jpg',
  './level6.jpg',
  './level7.jpg',
  './level8.jpg',
  './level9.jpg',
  './level10.jpg'
];

// Install: cache dei file principali
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: pulizia vecchie cache se cambi versione
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Fetch: prova da cache, se no va in rete
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        // Se offline e non c'è in cache, niente (potremmo mettere una schermata offline qui)
        return new Response('Offline', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
