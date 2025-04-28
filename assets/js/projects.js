document.addEventListener('DOMContentLoaded', () => {
  // Initialize project cards with staggered animation
  const cards = document.querySelectorAll('.project-card');
  cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Initialize tech badge hover effects
  const badges = document.querySelectorAll('.technologies .badge');
  badges.forEach(badge => {
    badge.addEventListener('mouseover', function() {
      this.style.transform = 'translateY(-2px) rotate(3deg)';
    });
    badge.addEventListener('mouseout', function() {
      this.style.transform = 'translateY(0) rotate(0deg)';
    });
  });

  // Project image parallax effect
  const projectImages = document.querySelectorAll('.project-image');
  window.addEventListener('scroll', () => {
    projectImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
      if (isVisible) {
        const scrolled = window.pageYOffset;
        img.style.transform = `translateY(${scrolled * 0.05}px)`;
      }
    });
  });
});