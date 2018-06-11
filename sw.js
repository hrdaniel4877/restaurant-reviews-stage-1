// service worker version
let version = 'r-reviews-v1-';

// data to cache
let cachedArray = [
    '/',
    './index.html',
    './restaurant.html',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//install service worker and create a new cache
self.addEventListener('install', function(event) {
    console.log('installing worker');
    event.waitUntil(caches.open(version + 'core')
        .then(function(cache) {
            return cache.addAll(cachedArray);
        })
        .then(function() {
            console.log('installation complete');
        })
    );
});

// fetch updates from the network
self.addEventListener('fetch', function(event) {
    console.log('fetch updates from the network');
    
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
});

// activate new cache and delete the old cache
self.addEventListener('activate', function(event) {
    console.log('activate new cache');
    
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.filter(function(cacheName) {
                    return cacheName.startsWith('r-reviews-') && cacheName != version;
                }).map(function(cacheName) {
                    return cache.delete(cacheName);
                })
            )
        }).catch(function (error) {
            // on first run, it should log this error
            console.log('there is no old cache to be deleted');
            return
        })
    );
});