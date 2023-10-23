/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
self.addEventListener("install", event => {
  event.waitUntil(caches.open("my-cache").then(cache => {
    return cache.addAll(["/favicon.png"]); // Add your notification icon path here
  }));
});

self.addEventListener("activate", event => {
  // Perform any necessary cleanup or updates here
});
self.addEventListener("fetch", event => {
  // Handle fetch events or cache updates here
});
self.addEventListener("push", event => {
  const options = {
    body: event.data.text(),
    // Message content from the push notification
    icon: "/favicon.png" // Replace with the path to your notification icon
  };

  event.waitUntil(self.registration.showNotification("Push Notification", options));
});
self.addEventListener("notificationclick", event => {
  event.notification.close(); // Close the notification

  // Handle the click action here, e.g., open a specific URL
  clients.openWindow("https://example.com");
});
/******/ })()
;