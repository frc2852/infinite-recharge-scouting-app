import validResponse from './functions/valid-response';

const OFFLINE_PAGES = 'OFFLINE_PAGES';

self.addEventListener('fetch', event => {
  event.respondWith(
    (async function() {
      if (navigator.onLine) {
        try {
          const response = await fetch(event.request);
          if (validResponse(response)) {
            if (event.request.method === 'GET' && event.request.url.indexOf('firestore') === -1) {
              const responseToCache = response.clone();
              await caches.open(OFFLINE_PAGES).then(cache => cache.put(event.request, responseToCache));
            }

            return response;
          }
        } catch (e) {
          console.error(e);
        }
      }

      return await caches.match(event.request);
    })()
  );
});
