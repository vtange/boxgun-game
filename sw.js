importScripts("hashes.js");var cacheName="v3",cacheFiles=["./index.html","./"+hashes["vendors~main"].js,"./"+hashes.main.js,"./"+hashes.main.css];self.addEventListener("install",function(e){console.log("SW:INSTALL"),e.waitUntil(caches.open(cacheName).then(function(e){return console.log("SW caching:",cacheFiles,cacheName),e.addAll(cacheFiles).then(function(){console.log("SW:INSTALL---\x3e COMPLETE")}).catch(function(e){throw e})}))}),self.addEventListener("activate",function(e){console.log("SW:ACTIVATE"),e.waitUntil(caches.keys().then(function(e){return Promise.all(e.map(function(e){if(e!==cacheName)return console.log("SW Removing obsolete cached files from",e),caches.delete(e)}))}))}),self.addEventListener("push",function(e){console.log("Push message received",e)}),self.addEventListener("fetch",function(n){console.log("SW:FETCH",n.request.url),n.respondWith(caches.match(n.request).then(function(e){return-1!==n.request.url.lastIndexOf("hashes")&&(e=void 0),e?console.log(n.request.url,"->Got Files from cache:"+e):console.log(n.request.url,"->Fetching new files:"),e||fetch(n.request).then(function(e){return console.log(n.request.url,"->Fetched:",e),e}).catch(function(e){throw e})}))});