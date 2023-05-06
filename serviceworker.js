const assets = ["/", "styles.css", "app.js", "sw-register.js",
  "https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2"
];

self.addEventListener("install", event => {
  caches.open("assets").then( cache => {
    cache.addAll(assets);
  });
});

self.addEventListener("fetch", event => {
  if (event.request.url == "http://localhost:5500/fake") {
    const response = new Response(`Hello, I'm a response on URL ${event.request.url}`);
    event.respondWith(response);
  }
});
