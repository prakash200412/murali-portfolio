// Ultra Modern Portfolio JavaScript - Premium UI 2024

// Enhanced Loading Screen with Animations
window.addEventListener('load', () => {
  const loading = document.querySelector('.loading');
  if (loading) {
    // Add fade out animation
    loading.style.opacity = '0';
    loading.style.transform = 'scale(0.8)';
    
    setTimeout(() => {
      loading.style.display = 'none';
      document.body.style.overflow = 'auto';
      
      // Trigger entrance animations
      initEntranceAnimations();
    }, 600);
  }
});

// Advanced Entrance Animations
function initEntranceAnimations() {
  const heroElements = document.querySelectorAll('.hero-content > *');
  heroElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    
    setTimeout(() => {
      el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, index * 200 + 300);
  });
}

// Advanced Cursor Effects
class CursorEffects {
  constructor() {
    this.cursor = null;
    this.cursorDot = null;
    this.init();
  }
  
  init() {
    // Create custom cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'custom-cursor';
    this.cursor.style.cssText = `
      position: fixed;
      width: 40px;
      height: 40px;
      border: 2px solid var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.1s ease;
      mix-blend-mode: difference;
      opacity: 0;
    `;
    
    this.cursorDot = document.createElement('div');
    this.cursorDot.className = 'cursor-dot';
    this.cursorDot.style.cssText = `
      position: fixed;
      width: 8px;
      height: 8px;
      background: var(--accent-primary);
      border-radius: 50%;
      pointer-events: none;
      z-index: 10000;
      transition: all 0.1s ease;
      opacity: 0;
    `;
    
    document.body.appendChild(this.cursor);
    document.body.appendChild(this.cursorDot);
    
    this.bindEvents();
  }
  
  bindEvents() {
    document.addEventListener('mousemove', (e) => {
      this.cursor.style.left = e.clientX - 20 + 'px';
      this.cursor.style.top = e.clientY - 20 + 'px';
      this.cursor.style.opacity = '1';
      
      this.cursorDot.style.left = e.clientX - 4 + 'px';
      this.cursorDot.style.top = e.clientY - 4 + 'px';
      this.cursorDot.style.opacity = '1';
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .portfolio-item');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        this.cursor.style.transform = 'scale(1.5)';
        this.cursor.style.background = 'rgba(99, 102, 241, 0.1)';
      });
      
      el.addEventListener('mouseleave', () => {
        this.cursor.style.transform = 'scale(1)';
        this.cursor.style.background = 'transparent';
      });
    });
    
    document.addEventListener('mouseleave', () => {
      this.cursor.style.opacity = '0';
      this.cursorDot.style.opacity = '0';
    });
  }
}

// Initialize cursor effects on desktop (disabled per user preference)
// if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
//   new CursorEffects();
// }

// Enhanced Header Scroll Effect with RequestAnimationFrame
const header = document.querySelector('.site-header');
let lastScroll = 0;
let ticking = false;

function updateHeader() {
  const currentScroll = window.pageYOffset;
  
  // Add scrolled class for styling
  if (currentScroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
  
  // Hide/show header on scroll
  if (currentScroll > lastScroll && currentScroll > 100) {
    header.style.transform = 'translateY(-100%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  
  lastScroll = currentScroll;
  ticking = false;
}

if (header) {
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  }, { passive: true });
}

// Enhanced Intersection Observer for Smooth Reveal Animations
const initRevealAnimations = () => {
  const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px 0px -20% 0px'
  };

  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        // Only unobserve if it's a one-time animation
        if (!entry.target.classList.contains('repeat-animation')) {
          observer.unobserve(entry.target);
        } else if (!entry.isIntersecting) {
          entry.target.classList.remove('show');
        }
      }
    });
  };

  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
  // Observe elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  
  return observer;
};

// Initialize reveal animations
document.addEventListener('DOMContentLoaded', initRevealAnimations);

// Enhanced Smooth Scrolling with Offset for Fixed Header
const initSmoothScrolling = () => {
  const header = document.querySelector('.site-header');
  const headerHeight = header ? header.offsetHeight : 0;
  const offset = 20; // Additional offset from the top
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const target = document.querySelector(targetId);
      
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - offset;
        
        // Close mobile menu if open
        const mobileMenu = document.querySelector('#site-nav');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          document.body.style.overflow = 'auto';
        }
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without adding to history
        history.replaceState(null, null, targetId);
      }
    });
  });
};

document.addEventListener('DOMContentLoaded', initSmoothScrolling);

// Typing Animation for Hero Text
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing animation if element exists
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
  const originalText = heroTitle.textContent;
  setTimeout(() => {
    typeWriter(heroTitle, originalText, 80);
  }, 500);
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Card Hover Effects
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px) scale(1.02)';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });
});

// Skill Items Animation
document.querySelectorAll('.skill-item').forEach((skill, index) => {
  skill.style.animationDelay = `${index * 0.1}s`;
  skill.classList.add('reveal');
});

// Contact Form Enhancement
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  const inputs = contactForm.querySelectorAll('input, textarea');
  
  inputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
      this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentElement.classList.remove('focused');
      }
    });
    
    // Add floating label effect
    if (input.value) {
      input.parentElement.classList.add('focused');
    }
  });
  
  // Form submission
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Add loading state
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
      submitBtn.textContent = 'Message Sent!';
      submitBtn.style.background = 'var(--accent-tertiary)';
      
      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
        this.reset();
      }, 2000);
    }, 1500);
  });
}

// Advanced Particle System
class ParticleSystem {
  constructor(container, options = {}) {
    this.container = container;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.mouse = { x: 0, y: 0 };
    
    this.options = {
      particleCount: 80,
      particleSize: { min: 1, max: 3 },
      speed: { min: 0.5, max: 2 },
      colors: ['#6366f1', '#8b5cf6', '#ec4899', '#06b6d4'],
      opacity: { min: 0.1, max: 0.6 },
      connectionDistance: 120,
      ...options
    };
    
    this.init();
  }
  
  init() {
    // Create canvas
    this.canvas = document.createElement('canvas');
    this.canvas.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
      z-index: 0;
    `;
    
    this.ctx = this.canvas.getContext('2d');
    this.container.appendChild(this.canvas);
    
    this.resize();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }
  
  resize() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
  }
  
  createParticles() {
    for (let i = 0; i < this.options.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * this.options.speed.max,
        vy: (Math.random() - 0.5) * this.options.speed.max,
        size: Math.random() * (this.options.particleSize.max - this.options.particleSize.min) + this.options.particleSize.min,
        opacity: Math.random() * (this.options.opacity.max - this.options.opacity.min) + this.options.opacity.min,
        color: this.options.colors[Math.floor(Math.random() * this.options.colors.length)]
      });
    }
  }
  
  bindEvents() {
    window.addEventListener('resize', () => this.resize());
    
    this.container.addEventListener('mousemove', (e) => {
      const rect = this.container.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Update and draw particles
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
      
      // Mouse interaction
      const dx = this.mouse.x - particle.x;
      const dy = this.mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < 100) {
        const force = (100 - distance) / 100;
        particle.vx += dx * force * 0.01;
        particle.vy += dy * force * 0.01;
      }
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0');
      this.ctx.fill();
      
      // Draw connections
      for (let j = index + 1; j < this.particles.length; j++) {
        const other = this.particles[j];
        const dx = particle.x - other.x;
        const dy = particle.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < this.options.connectionDistance) {
          const opacity = (1 - distance / this.options.connectionDistance) * 0.3;
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(other.x, other.y);
          this.ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
          this.ctx.lineWidth = 1;
          this.ctx.stroke();
        }
      }
    });
    
    requestAnimationFrame(() => this.animate());
  }
}

// Initialize advanced particle system
const hero = document.querySelector('.hero');
if (hero && window.innerWidth > 768) {
  new ParticleSystem(hero, {
    particleCount: 60,
    particleSize: { min: 1, max: 2 },
    speed: { min: 0.3, max: 1.5 },
    connectionDistance: 100
  });
}

// Cursor Trail Effect
let mouseX = 0;
let mouseY = 0;
let cursorTrail = [];

function createCursorTrail() {
  const trail = document.createElement('div');
  trail.className = 'cursor-trail';
  trail.style.cssText = `
    position: fixed;
    width: 6px;
    height: 6px;
    background: var(--accent-primary);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    opacity: 0.8;
    transition: all 0.1s ease;
  `;
  document.body.appendChild(trail);
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    trail.style.left = mouseX - 3 + 'px';
    trail.style.top = mouseY - 3 + 'px';
  });
}

// Initialize cursor trail (disabled per user preference)
// createCursorTrail();

// Scroll Progress Indicator
function createScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  progress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 1001;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progress.style.width = scrollPercent + '%';
  });
}

// Initialize scroll progress
createScrollProgress();

// Active nav link on scroll (IntersectionObserver)
(function(){
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  const links = Array.from(nav.querySelectorAll('a[href^="#"]'));
  if (!links.length) return;
  const map = new Map();
  links.forEach(link => {
    const id = link.getAttribute('href').slice(1);
    const section = document.getElementById(id);
    if (section) map.set(section, link);
  });
  if (!map.size) return;

  const setActive = (link) => {
    links.forEach(a => { a.classList.remove('active'); a.removeAttribute('aria-current'); });
    if (link) { link.classList.add('active'); link.setAttribute('aria-current', 'page'); }
  };

  const header = document.querySelector('.site-header');
  const headerOffset = header ? header.offsetHeight + 8 : 72;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = map.get(entry.target);
      if (!link) return;
      if (entry.isIntersecting) {
        setActive(link);
      }
    });
  }, { rootMargin: `-${headerOffset}px 0px -60% 0px`, threshold: 0.2 });

  map.forEach((_, section) => observer.observe(section));
})();

// Mobile Menu Toggle (enhanced)
(function(){
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('site-nav');
  if (!btn || !nav) return;
  
  // Ensure a backdrop element exists for mobile menu
  let backdrop = document.querySelector('.mobile-menu-backdrop');
  if (!backdrop) {
    backdrop = document.createElement('div');
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      opacity: 0;
      visibility: hidden;
      z-index: 999;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    `;
    document.body.appendChild(backdrop);
  }

  const toggle = () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    nav.classList.toggle('active');
    
    if (!isExpanded) {
      // Opening menu
      backdrop.style.visibility = 'visible';
      backdrop.style.opacity = '1';
      document.body.style.overflow = 'hidden';
      // Add animation class for menu items
      const navLinks = nav.querySelectorAll('.nav-link');
      navLinks.forEach((link, index) => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
        link.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
        // Force reflow
        void link.offsetWidth;
        link.style.opacity = '1';
        link.style.transform = 'translateX(0)';
      });
    } else {
      // Closing menu
      backdrop.style.opacity = '0';
      const navLinks = nav.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateX(20px)';
      });
      setTimeout(() => {
        backdrop.style.visibility = 'hidden';
        document.body.style.overflow = '';
      }, 300);
    }
  };

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggle();
  });

  // Close when clicking outside
  backdrop.addEventListener('click', () => {
    if (nav.classList.contains('active')) {
      toggle();
    }
  });

  // Close when clicking a link
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        toggle();
      }
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      toggle();
    }
  });

  // Reset on resize back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900 && nav.classList.contains('active')) {
      toggle();
    }
  });
})();

// Back to top button
(function(){
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;
  const onScroll = () => {
    if (window.scrollY > 400) backToTop.classList.add('show');
    else backToTop.classList.remove('show');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
})();

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.getElementById('site-nav');
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  if (!nav || !mobileMenuBtn) return;
  if (nav.classList.contains('active') &&
      !nav.contains(e.target) &&
      !mobileMenuBtn.contains(e.target)) {
    nav.classList.remove('active');
    mobileMenuBtn.classList.remove('active');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = 'auto';
  }
});

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
  // Scroll-based animations can go here
}, 16)); // ~60fps

// Animate Progress Bars on Scroll
const initProgressBars = () => {
  const skillSection = document.querySelector('#skills');
  if (!skillSection) return;

  const progressBars = skillSection.querySelectorAll('.progress');

  const animateProgress = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const level = bar.getAttribute('data-level');
        bar.style.width = `${level}%`;
        observer.unobserve(bar);
      }
    });
  };

  const observer = new IntersectionObserver(animateProgress, {
    threshold: 0.5
  });

  progressBars.forEach(bar => {
    observer.observe(bar);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  initProgressBars();
  initPortfolioFilter();
  initContactForm();
});

// Contact Form Validation
const initContactForm = () => {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  const nameInput = form.querySelector('input[name="name"]');
  const emailInput = form.querySelector('input[name="email"]');
  const messageInput = form.querySelector('textarea[name="message"]');

  const validateField = (field) => {
    let isValid = false;
    if (field.type === 'email') {
      isValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(field.value);
    } else {
      isValid = field.value.trim() !== '';
    }

    if (isValid) {
      field.classList.remove('invalid');
      field.classList.add('valid');
    } else {
      field.classList.remove('valid');
      field.classList.add('invalid');
    }
    return isValid;
  };

  form.addEventListener('submit', (e) => {
    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isMessageValid = validateField(messageInput);

    if (!isNameValid || !isEmailValid || !isMessageValid) {
      e.preventDefault();
      // Optionally, focus the first invalid field
      const firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) firstInvalid.focus();
    }
  });

  // Real-time validation
  nameInput.addEventListener('input', () => validateField(nameInput));
  emailInput.addEventListener('input', () => validateField(emailInput));
  messageInput.addEventListener('input', () => validateField(messageInput));
};

// Portfolio Filtering
const initPortfolioFilter = () => {
  const filters = document.querySelector('.portfolio-filters');
  if (!filters) return;

  const filterBtns = filters.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item[data-category]');

  filters.addEventListener('click', (e) => {
    if (!e.target.matches('.filter-btn')) return;

    const filter = e.target.dataset.filter;

    filterBtns.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    portfolioItems.forEach(item => {
      const categories = item.dataset.category.split(' ');
      if (filter === 'all' || categories.includes(filter)) {
        // A short delay helps the animation feel smoother
        setTimeout(() => {
            item.classList.remove('hide');
        }, 100);
      } else {
        item.classList.add('hide');
      }
    });
  });
};
