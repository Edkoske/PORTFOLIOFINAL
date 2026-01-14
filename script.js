// Optimized loader - faster, smoother
(function() {
  'use strict';
  
  const loader = document.getElementById('loader');
  const progressEl = document.getElementById('progress');
  let progress = 0;
  const minDisplayTime = 800; // Reduced from 1200ms for faster loading
  const startTime = Date.now();
  
  // Optimized progress simulation
  const progressInterval = setInterval(() => {
    progress += Math.random() * 20;
    if (progress > 92) progress = 92;
    if (progressEl) progressEl.textContent = Math.floor(progress) + '%';
  }, 80);
  
  function completeLoading() {
    clearInterval(progressInterval);
    progress = 100;
    if (progressEl) progressEl.textContent = '100%';
    
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);
    
    setTimeout(() => {
      if (loader) loader.classList.add('hidden');
      setTimeout(() => {
        if (loader) loader.style.display = 'none';
        document.body.classList.remove('loading');
        document.body.style.overflow = 'auto';
      }, 400);
    }, remaining);
  }
  
  // Fast load detection
  if (document.readyState === 'complete') {
    completeLoading();
  } else {
    window.addEventListener('load', completeLoading);
    setTimeout(completeLoading, 2000); // Reduced timeout
  }
})();

// Fast smooth scroll - optimized for speed
(function() {
  'use strict';
  
  // Custom fast smooth scroll function
  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.pageYOffset;
    const distance = targetY - startY;
    let startTime = null;
    
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);
      
      window.scrollTo(0, startY + distance * ease);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  }
  
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const headerOffset = 80;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          
          // Use custom fast smooth scroll (600ms for speed)
          smoothScrollTo(offsetPosition, 600);
        }
      }
    });
  });
})();

// Intersection Observer - optimized for performance
(function() {
  'use strict';
  
  const observerOptions = { 
    threshold: 0.15, 
    rootMargin: '0px 0px -80px 0px' 
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.classList.contains('stagger-item')) {
          const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.08}s`;
        }
      }
    });
  }, observerOptions);
  
  // Observe elements
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item').forEach(el => {
    observer.observe(el);
  });
})();

// Parallax effect - optimized with requestAnimationFrame
(function() {
  'use strict';
  
  let ticking = false;
  const heroImg = document.querySelector('.hero-img');
  
  function updateParallax() {
    if (heroImg && window.innerWidth > 900) {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.25;
      heroImg.style.transform = `translateY(${parallax}px) scale(1)`;
    }
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
})();

// Project cards hover effect - optimized
(function() {
  'use strict';
  
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
})();

// Tag hover effects - optimized
(function() {
  'use strict';
  
  const tags = document.querySelectorAll('.tag');
  tags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-3px) scale(1.05)';
    });
    tag.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });
})();

// Button ripple effect - optimized
(function() {
  'use strict';
  
  document.querySelectorAll('.btn, .form-submit-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;`;
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
})();

// Contact Form - optimized
(function() {
  'use strict';
  
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  
  if (!contactForm) return;
  
  function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;
    
    document.querySelectorAll('.form-group').forEach(group => {
      group.classList.remove('error');
    });
    
    if (!name) {
      document.getElementById('name').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      document.getElementById('email').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (!subject) {
      document.getElementById('subject').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    if (!message || message.length < 10) {
      document.getElementById('message').closest('.form-group').classList.add('error');
      isValid = false;
    }
    
    return isValid;
  }
  
  function showMessage(text, type) {
    formMessage.textContent = text;
    formMessage.className = 'form-message ' + type;
    formMessage.style.display = 'block';
    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    setTimeout(() => {
      formMessage.style.display = 'none';
    }, 5000);
  }
  
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!validateForm()) {
      showMessage('Please fill in all fields correctly.', 'error');
      return;
    }
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
    }
    
    const formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    try {
      const mailtoLink = `mailto:edisonkipkemoi319@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
      window.location.href = mailtoLink;
      showMessage('Opening your email client... If it doesn\'t open, please email me directly at edisonkipkemoi319@gmail.com', 'success');
      
      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Send Message</span>';
        }
      }, 2000);
    } catch (error) {
      console.error('Error:', error);
      showMessage('Sorry, there was an error sending your message. Please try emailing me directly at edisonkipkemoi319@gmail.com', 'error');
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span>';
      }
    }
  });
  
  // Real-time validation
  const inputs = contactForm.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      if (this.value.trim() === '') {
        this.closest('.form-group').classList.add('error');
      } else {
        this.closest('.form-group').classList.remove('error');
      }
    });
    
    input.addEventListener('input', function() {
      if (this.value.trim() !== '') {
        this.closest('.form-group').classList.remove('error');
      }
    });
  });
})();

