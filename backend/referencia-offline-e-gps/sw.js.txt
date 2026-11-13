const CACHE_NAME = 'ponte-apoio-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './plan.mjs',
  './manifest.json',
  './assets/map.json',
  './assets/brand.jpg',
  'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2'
];

// Instalação: Guarda os arquivos essenciais no cache do navegador
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cache aberto e arquivos guardados para uso offline.');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Ativação: Limpa versões de cache antigas quando lançada uma nova atualização
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => {
          // Remove qualquer cache antigo que comece com 'ponte-' (inclui sua v3 antiga e a v1)
          return cacheName.startsWith('ponte-') && cacheName !== CACHE_NAME;
        }).map((cacheName) => {
          console.log('Cache antigo removido:', cacheName);
          return caches.delete(cacheName);
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação: Responde primeiro com o cache; se não tiver, tenta a rede
self.addEventListener('fetch', (event) => {
  // Ignora requisições que não sejam GET (como os POSTs/Inserts para o Supabase)
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }).catch(() => {
      console.log('Falha na rede e arquivo não encontrado no cache.');
    })
  );
});