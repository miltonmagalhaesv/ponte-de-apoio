const version = 'ponte-guia-v3';
const files = ['./','./index.html','./style.css','./app.js','./plan.mjs','./assets/map.json','./assets/brand.jpg'];
self.addEventListener('install', event => event.waitUntil(caches.open(version).then(cache => cache.addAll(files))));
self.addEventListener('activate', event => event.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(key => key.startsWith('ponte-guia-') && key !== version).map(key => caches.delete(key)))).then(() => self.clients.claim())));
self.addEventListener('fetch', event => {
  if (event.request.method === 'GET') event.respondWith(caches.open(version).then(async cache => (await cache.match(event.request)) || fetch(event.request)));
});
