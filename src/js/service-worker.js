import validResponse from './functions/valid-response';

const OFFLINE_PAGES = 'OFFLINE_PAGES';

self.addEventListener('fetch', event => {
    event.respondWith(async function () {
        if (navigator.onLine) {
            try {
                const response = await fetch(event.request);
                if (validResponse(response)) {

                    if (event.request.method === "GET") {
                        const responseToCache = response.clone();
                        await caches.open(OFFLINE_PAGES).then(cache => cache.put(event.request, responseToCache))
                    }

                    return response;
                }
            } catch (e) {
                console.log(e);
            }
        }

        return await caches.match(event.request);
    }());
});
