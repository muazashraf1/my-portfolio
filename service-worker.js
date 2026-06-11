// service-worker.js

self.addEventListener('install', event => {
    event.waitUntil(
      caches.open('static-assets-v1').then(cache => {
        return cache.addAll([
          '/',
          '/index.html',
          '/about.html',
          '/contact.html',
          '/404.html',
          '/resume.html',
          '/portfolio.html',
          '/page-full-width.html',
        //   Html files end here.
          '/css/768.css',
          '/css/bootstrap.css',
          '/css/demo2.css',
          '/css/demo3.css',
          '/css/editor-style.css',
          '/css/main.css',
          '/css/normalize.css',
        //   Css files end here.
          '/scripts/imagesloader.js',
          '/scripts/jqery-address.js',
          '/scripts/jqery-easing.js',
          '/scripts/jqery-fitvids.js',
          '/scripts/jqery-isotope.js',
          '/scripts/jqery-sticky-sidebar.js',
          '/scripts/jqery-validate.js',
          '/scripts/jqery.js',
          '/scripts/resize-sensor.js',
          '/scripts/tween-max.js',
        //   Js files end here.
          '/images/home/cover.png',
          '/images/ico/icon.png',
          '/images/ico/favicon.ico',
          // Add more resources to cache as needed
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        return response || fetch(event.request);
      })
    );
  });
  