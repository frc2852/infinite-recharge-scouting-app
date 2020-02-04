
module.exports = () => {
    if (!('serviceWorker' in navigator)) {
        console.error('service worker not supported!');
        return;
    }

    navigator.serviceWorker.register('service-worker.js');
}