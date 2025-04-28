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
  // Lazy loading images
  const lazyImages = document.querySelectorAll('img.lazy');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const sources = img.parentElement.querySelectorAll('source');
        
        // Load image
        img.src = img.dataset.src;
        img.classList.add('loaded');
        
        // Load sources if any (for picture element)
        sources.forEach(source => {
          if (source.dataset.srcset) {
            source.srcset = source.dataset.srcset;
          }
        });
        
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01
  });

  lazyImages.forEach(img => imageObserver.observe(img));
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

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formStatus = document.getElementById('formStatus');
      const submitButton = contactForm.querySelector('button[type="submit"]');
      
      try {
        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';
        
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: {
            'Accept': 'application/json'
          }
        });
        
        const json = await response.json();
        
        if (response.ok) {
          formStatus.textContent = 'Message sent successfully! I\'ll get back to you soon.';
          formStatus.className = 'alert alert-success';
          contactForm.reset();
        } else {
          throw new Error(json.error || 'Form submission failed');
        }
      } catch (error) {
        formStatus.textContent = 'There was an error sending your message. Please try again.';
        formStatus.className = 'alert alert-danger';
        console.error('Form submission error:', error);
      } finally {
        formStatus.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        
        // Hide status message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      }
    });
  }
});

// Text rotation animation
var TxtRotate = function(el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = '';
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function() {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) { delta /= 2; }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function() {
    that.tick();
  }, delta);
};

// Initialize text rotation
document.addEventListener('DOMContentLoaded', function() {
  var elements = document.getElementsByClassName('txt-rotate');
  for (var i=0; i<elements.length; i++) {
    var toRotate = elements[i].getAttribute('data-rotate');
    var period = elements[i].getAttribute('data-period');
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
});

// Offline detection
window.addEventListener('online', function() {
  document.querySelector('.offline-indicator')?.remove();
});

window.addEventListener('offline', function() {
  if (!document.querySelector('.offline-indicator')) {
    const indicator = document.createElement('div');
    indicator.className = 'offline-indicator';
    indicator.innerHTML = '<div class="offline-message">You are currently offline</div>';
    document.body.prepend(indicator);
  }
});