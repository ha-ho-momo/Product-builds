/* MoMo — Rà soát tài khoản cũ — Service Worker */
'use strict';

var CACHE_NAME = 'momo-account-review-v1';
var ASSETS = [
  './',
  './index.html',
  './manifest.json'
];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(ASSETS).catch(function () { return null; });
    })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(
        keys.map(function (k) {
          if (k !== CACHE_NAME) { return caches.delete(k); }
          return null;
        })
      );
    }).then(function () { return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') { return; }
  e.respondWith(
    caches.match(e.request).then(function (cached) {
      if (cached) { return cached; }
      return fetch(e.request).then(function (resp) {
        var copy = resp.clone();
        caches.open(CACHE_NAME).then(function (cache) {
          cache.put(e.request, copy).catch(function () { return null; });
        });
        return resp;
      }).catch(function () { return cached; });
    })
  );
});
