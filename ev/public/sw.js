const cacheName = "v9"; // Cahce Stroage 白名单
const offlineUrl = "index.html";
const cacheList = [
  "js/chunk-common.js",
  "css/chunk-common.css",
  "js/index.js",
  "css/index.css",
  "css/chunk-vendors.css",
  "js/chunk-vendors.js",
];
let imgcaches = {};
let id = 0;
this.addEventListener("fetch", (event) => {
  console.log(event.request.method);
  const request2 = event.request.clone();
  if (event.request.method == "PUT") {
    let name = event.request.url;
    let response = new Response(JSON.stringify({ path: name }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    event.respondWith(
      request2.text().then((content) => {
        let request = new Request(name);

        return caches.open(cacheName).then(function (cache) {
          return fetch(content).then((r) => {
            cache.put(request, r.clone());
            console.log("resp");
            return response;
          });
        });
      })
    );
  }

  console.log(event.request);
  if (event.request.method === "GET") {
    event.respondWith(
      caches.open(cacheName).then(function (cache) {
        return cache
          .match(event.request, {
            ignoreVary: true,
            ignoreSearch: true,
          })
          .then(function (response) {
            return response || fetch(event.request);
          });
      })
    );
  }
});

function isValid(response, time) {
  if (!response) return false;
  var fetched = response.headers.get("sw-fetched-on");
  if (fetched && parseInt(fetched) + parseInt(time) > new Date().getTime())
    return true;
  return false;
}
