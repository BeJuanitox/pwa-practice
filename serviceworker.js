const assets = ["/", "styles.css", "app.js", "sw-register.js",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2" ];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("assets").then( cache => {
      cache.addAll(assets);
    })
  )
});

self.addEventListener("fetch", event => {
  if (event.request.url == "http://localhost:5500/fake") {
    const response = new Response(`Hello, I'm a response on URL ${event.request.url}`);
    event.respondWith(response);
  } else {
    // We want to try and see if the request is cached
    event.respondWith(
      caches.open("assets").then(cache => {
        cache.match(event.request).then(cachedResponse => {
          if (cachedResponse) {
            // It's a cache HIT
            return cachedResponse;
          } else {
            // It's a cache MISS
            return fetch(event.request);
          }
        })
      })
    )
  }
});
