import { precacheAndRoute } from 'workbox-precaching';
import { cacheNames } from 'workbox-core';
import { registerRoute } from 'workbox-routing';

import {CacheFirst} from 'workbox-strategies';
import {ExpirationPlugin} from 'workbox-expiration';
import {CacheableResponsePlugin} from 'workbox-cacheable-response';

precacheAndRoute(self.__WB_MANIFEST);
self.addEventListener('install', (event) => {
    console.log("install")
    event.waitUntil(
        caches.open("auth-user-cache").then((cache) => {
            cache.keys().then((keys) => {
                keys.forEach((request, index, array) => {
                    console.log('Request : ' + request)
                })
            })
        })
    )
});

self.skipWaiting();

const data = {
    race: false,
    debug: false,
    credentials: 'same-origin',
    networkTimeoutSeconds: 0,
    fallback: 'index.html'
};

const cacheName = cacheNames.runtime;

self.addEventListener('activate', (event) => {
    console.log("activate")
});

// Define your runtime caching strategy here
registerRoute(
    /^https:\/\/6557178bbd4bcef8b61208ce.mockapi.io\/article\/article$/,
    new CacheFirst({
        cacheName: 'auth-user-cache',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 10,
                maxAgeSeconds: 3, // 3 seconds for development, adjust for production
            }),
            new CacheableResponsePlugin({
                statuses: [0, 200],
            }),
        ],
    })
);
