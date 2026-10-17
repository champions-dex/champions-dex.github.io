importScripts('./artwork-data.js');

const VERSION = 'champions-dex-pwa-v19';
const SHELL_CACHE = `${VERSION}-shell`;
const DATA_CACHE = `${VERSION}-data`;
const CORE_SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './team-codes-lib.js',
  './data/team-codes.json',
  './champions-calc.js',
  './roster-data.js',
  './mechanics-data.js',
  './mega-data.js',
  './knowledge-data.js',
  './reference-move-data.js',
  './ability-data.js',
  './artwork-data.js',
  './manifest.webmanifest',
  './icons/app-icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/artwork-unavailable.svg'
];
const ARTWORK_SHELL = [...new Set(Object.values(CHAMPIONS_ARTWORK))];
const CACHEABLE_HOSTS = new Set([
  'pokeapi.co',
  'raw.githubusercontent.com',
  'fonts.googleapis.com',
  'fonts.gstatic.com'
]);

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then(async cache => {
        await cache.addAll(CORE_SHELL);
        await Promise.allSettled(ARTWORK_SHELL.map(url => cache.add(url)));
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key.startsWith('champions-dex-pwa-') && !key.startsWith(VERSION)).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

async function networkFirst(request, fallback) {
  const cache = await caches.open(DATA_CACHE);
  try {
    const response = await fetch(request);
    if (!response.ok && response.type !== 'opaque') throw new Error(`HTTP ${response.status}`);
    cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (fallback ? await caches.match(fallback) : Response.error());
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(SHELL_CACHE);
  const cached = await cache.match(request);
  const update = fetch(request).then(response => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached || (await update) || Response.error();
}

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './index.html'));
    return;
  }

  if (url.origin === self.location.origin) {
    const freshShell = request.destination === 'document' || request.destination === 'script' || request.destination === 'style';
    event.respondWith(freshShell ? networkFirst(request) : staleWhileRevalidate(request));
    return;
  }

  if (CACHEABLE_HOSTS.has(url.hostname)) {
    event.respondWith(networkFirst(request));
  }
});
