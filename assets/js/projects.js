document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });

  // Project filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      
      // Update active button state
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Filter projects with animation
      projectCards.forEach(card => {
        const tags = card.dataset.tags.split(',');
        if (filter === 'all' || tags.includes(filter)) {
          card.style.display = 'block';
          card.setAttribute('data-aos', 'fade-up');
        } else {
          card.style.display = 'none';
          card.removeAttribute('data-aos');
        }
      });
      
      AOS.refresh();
    });
  });

  // Project card hover effects
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      const image = card.querySelector('.project-image');
      const details = card.querySelector('.project-details');
      
      image.style.transform = 'scale(1.05)';
      details.style.opacity = '1';
    });

    card.addEventListener('mouseleave', () => {
      const image = card.querySelector('.project-image');
      const details = card.querySelector('.project-details');
      
      image.style.transform = 'scale(1)';
      details.style.opacity = '0.8';
    });
  });

  // Search functionality
  const searchInput = document.getElementById('project-search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchTerm = e.target.value.toLowerCase();
      
      projectCards.forEach(card => {
        const title = card.querySelector('.project-title').textContent.toLowerCase();
        const description = card.querySelector('.project-description').textContent.toLowerCase();
        const tags = card.dataset.tags.toLowerCase();
        
        if (title.includes(searchTerm) || description.includes(searchTerm) || tags.includes(searchTerm)) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  }
});