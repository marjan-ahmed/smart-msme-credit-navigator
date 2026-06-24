// Stub service worker - no Firebase needed for hackathon
self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", () => self.clients.claim());
