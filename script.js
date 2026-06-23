(function () {
  'use strict';

  // Page entrance
  function initPage() {
    document.body.classList.remove('loading');
    document.body.classList.add('loaded');
  }

  if (document.readyState === 'complete') {
    initPage();
  } else {
    window.addEventListener('load', initPage);
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href === '#') return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      var offset = 64;
      var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  // Mobile menu
  var menuToggle = document.getElementById('menu-toggle');
  var nav = document.getElementById('site-navigation');

  if (menuToggle && nav) {
    menuToggle.addEventListener('change', function () {
      menuToggle.setAttribute('aria-expanded', menuToggle.checked ? 'true' : 'false');
    });

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function () {
        if (window.innerWidth <= 768 && menuToggle.checked) {
          menuToggle.checked = false;
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuToggle.checked) {
        menuToggle.checked = false;
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Scroll reveal
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.classList.contains('stagger-item')) {
            var index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
            entry.target.style.transitionDelay = index * 0.06 + 's';
          }
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-item').forEach(function (el) {
      el.classList.add('active');
    });
  }

  // Active nav link on scroll
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('nav a[href^="#"]');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;
    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // Contact form
  var contactForm = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var formMessage = document.getElementById('formMessage');

  if (!contactForm) return;

  function validateForm() {
    var name = document.getElementById('name').value.trim();
    var email = document.getElementById('email').value.trim();
    var subject = document.getElementById('subject').value.trim();
    var message = document.getElementById('message').value.trim();
    var isValid = true;

    document.querySelectorAll('.form-group').forEach(function (group) {
      group.classList.remove('error');
    });

    if (!name) {
      document.getElementById('name').closest('.form-group').classList.add('error');
      isValid = false;
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
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
    setTimeout(function () {
      formMessage.className = 'form-message';
      formMessage.textContent = '';
    }, 5000);
  }

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!validateForm()) {
      showMessage('Please fill in all fields correctly.', 'error');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    var formData = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      subject: document.getElementById('subject').value.trim(),
      message: document.getElementById('message').value.trim()
    };

    var mailtoLink = 'mailto:edisonkipkemoi319@gmail.com?subject=' +
      encodeURIComponent(formData.subject) +
      '&body=' + encodeURIComponent(
        'Name: ' + formData.name + '\nEmail: ' + formData.email + '\n\nMessage:\n' + formData.message
      );

    window.location.href = mailtoLink;
    showMessage('Opening your email client. If it does not open, email edisonkipkemoi319@gmail.com directly.', 'success');

    setTimeout(function () {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }, 2000);
  });

  contactForm.querySelectorAll('input, textarea').forEach(function (input) {
    input.addEventListener('blur', function () {
      if (this.value.trim() === '') {
        this.closest('.form-group').classList.add('error');
      } else {
        this.closest('.form-group').classList.remove('error');
      }
    });
    input.addEventListener('input', function () {
      if (this.value.trim() !== '') {
        this.closest('.form-group').classList.remove('error');
      }
    });
  });
})();
