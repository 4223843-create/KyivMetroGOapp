// sw.js

// Назва кеша (можеш змінити під свій проєкт)
const CACHE_NAME = "metro-go-cache-v1";

// Які файли закешувати одразу при встановленні
const urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png"
];

// Встановлення service worker і кешування файлів
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Перехоплення запитів і віддача з кеша, якщо немає інтернету
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});