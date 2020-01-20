import validResponse from './functions/valid-response';

const OFFLINE_PAGES = 'OFFLINE_PAGES';

self.addEventListener('fetch', event => {
    event.respondWith(async function () {
        try {
            const response = await fetch(event.request);
            if (validResponse(response)) {
                const responseToCache = response.clone();
                caches.open(OFFLINE_PAGES).then(cache => cache.put(event.request, responseToCache))

                return response;
            }
        } catch (e) {
            console.error(e);
        }

        return await caches.match(event.request);
    }());
});
