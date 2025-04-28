// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/assets/js/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.error('ServiceWorker registration failed: ', err);
      });
  });
}

// Check Online/Offline Status
function updateOnlineStatus() {
  const body = document.body;
  const statusIndicator = document.createElement('div');
  statusIndicator.id = 'status-indicator';
  
  if (navigator.onLine) {
    body.classList.remove('offline');
    if (document.getElementById('status-indicator')) {
      document.getElementById('status-indicator').remove();
    }
  } else {
    body.classList.add('offline');
    statusIndicator.textContent = 'You are currently offline. Some content may not be available.';
    if (!document.getElementById('status-indicator')) {
      body.insertBefore(statusIndicator, body.firstChild);
    }
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);
updateOnlineStatus(); // Initial check

// PWA Install Prompt
let deferredPrompt;
const installButton = document.createElement('button');
installButton.classList.add('install-button');
installButton.style.display = 'none';
installButton.textContent = 'Install App';

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installButton.style.display = 'block';
  document.body.appendChild(installButton);
});

installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to install prompt: ${outcome}`);
    deferredPrompt = null;
    installButton.style.display = 'none';
  }
});

// Performance Optimization
document.addEventListener('DOMContentLoaded', () => {
  // Lazy load images
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll('[data-animate]');
  const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
      }
    });
  });

  animatedElements.forEach(el => animationObserver.observe(el));
});

// Handle push notification permission
async function requestNotificationPermission() {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Subscribe to push notifications here
      console.log('Notification permission granted');
    }
  }
}

// Cache API helper functions
async function updateCache(cacheName, urls) {
  const cache = await caches.open(cacheName);
  await cache.addAll(urls);
}

// Clean up old caches
async function deleteOldCaches(currentCache) {
  const keys = await caches.keys();
  for (const key of keys) {
    if (key !== currentCache) {
      await caches.delete(key);
    }
  }
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    updateCache,
    deleteOldCaches,
    requestNotificationPermission
  };
}