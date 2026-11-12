const version = 'ponte-guia-v1';
const files = ['./','./index.html','./style.css','./app.js','./plan.mjs'];
self.addEventListener('install', event => event.waitUntil(caches.open(version).then(cache => cache.addAll(files))));
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') event.respondWith(caches.open(version).then(async cache => (await cache.match(event.request)) || fetch(event.request)));
});
