// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Register Service Worker for offline capabilities
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          })
          .catch(error => {
            console.log('ServiceWorker registration failed: ', error);
          });
      });
    }
  
    // Create offline status indicator
    const offlineIndicator = document.createElement('div');
    offlineIndicator.className = 'offline-indicator';
    offlineIndicator.textContent = 'Anda sedang offline';
    document.body.appendChild(offlineIndicator);
  
    // Check online status and update UI
    function updateOnlineStatus() {
      if (navigator.onLine) {
        offlineIndicator.classList.remove('visible');
      } else {
        offlineIndicator.classList.add('visible');
      }
    }
  
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus(); // Initial check
  
    // Header scroll effect
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;
    
    // Create mobile menu elements
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    
    const mobileMenuList = document.createElement('ul');
    
    // Clone navigation items for mobile menu
    const navItems = document.querySelectorAll('.main-nav ul li');
    navItems.forEach(item => {
      const clone = item.cloneNode(true);
      mobileMenuList.appendChild(clone);
    });
    
    mobileMenu.appendChild(mobileMenuList);
    body.appendChild(mobileMenu);
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    body.appendChild(overlay);
    
    // Toggle mobile menu
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      overlay.classList.toggle('active');
      body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', function() {
      menuToggle.classList.remove('active');
      mobileMenu.classList.remove('active');
      this.classList.remove('active');
      body.classList.remove('menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', function() {
        menuToggle.classList.remove('active');
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
      });
    });
    
    // Add scroll event for header styles
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          const headerHeight = header.offsetHeight;
          const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          
          window.scrollTo({
            top: targetPosition - headerHeight,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Lazy loading for images
    const lazyLoadImages = function() {
      const lazyImages = document.querySelectorAll('[data-src]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          });
        });
        
        lazyImages.forEach(image => {
          imageObserver.observe(image);
        });
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        const lazyLoad = function() {
          if (lazyLoadThrottleTimeout) {
            clearTimeout(lazyLoadThrottleTimeout);
          }
          
          lazyLoadThrottleTimeout = setTimeout(() => {
            const scrollTop = window.scrollY;
            
            lazyImages.forEach(img => {
              if (img.offsetTop < window.innerHeight + scrollTop) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
              }
            });
            
            if (lazyImages.length === 0) {
              document.removeEventListener('scroll', lazyLoad);
              window.removeEventListener('resize', lazyLoad);
              window.removeEventListener('orientationChange', lazyLoad);
            }
          }, 20);
        };
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
      }
    };
    
    // Call lazy loading function
    lazyLoadImages();
    
    // Add animation to elements when they enter viewport
    const animateOnScroll = function() {
      const animatedElements = document.querySelectorAll('.tech-item, .update-item, .mission-content, .about-text');
      
      if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        
        animatedElements.forEach(element => {
          element.style.opacity = '0';
          element.style.transform = 'translateY(20px)';
          element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
          animationObserver.observe(element);
        });
      }
    };
    
    // Call animation function
    animateOnScroll();
  });