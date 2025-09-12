document.addEventListener('DOMContentLoaded', () => {
  // Set up active section observer for navigation highlighting
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  // Function to update active nav link
  const updateActiveLink = (id) => {
    navLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'page');
        link.classList.add('active');
      } else {
        link.removeAttribute('aria-current');
        link.classList.remove('active');
      }
    });
  };
  
  // Initial check on page load
  const checkSectionInView = () => {
    let currentSection = '';
    const pageYOffset = window.pageYOffset;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100; // Adjust offset as needed
      const sectionHeight = section.offsetHeight;
      
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    if (currentSection) {
      updateActiveLink(currentSection);
    }
  };
  
  // Run on scroll and resize
  let isScrolling;
  window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);
    isScrolling = setTimeout(checkSectionInView, 100);
  }, { passive: true });
  
  window.addEventListener('resize', checkSectionInView);
  
  // Initial check
  setTimeout(checkSectionInView, 100);

  // Optimize card hover effect with rAF (desktop/pointer fine only)
  const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
  if (supportsFinePointer) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      let rafId = null;
      let lastX = 0;
      let lastY = 0;
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        lastX = e.clientX - rect.left;
        lastY = e.clientY - rect.top;
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
          const centerX = card.clientWidth / 2;
          const centerY = card.clientHeight / 2;
          const angleX = (lastY - centerY) / 20;
          const angleY = (centerX - lastX) / 20;
          card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
          rafId = null;
        });
      };
      card.addEventListener('mousemove', onMove, { passive: true });
      card.addEventListener('mouseleave', () => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = null;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
      });
    });
  }

  // Note: Theme toggling is implemented in static/js/theme.js
  });
