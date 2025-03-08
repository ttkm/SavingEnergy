// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('mobile-menu-open');
            }
        });
    });
    
    // Enhanced smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav && nav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll indicator with improved styling
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
    // Add back to top button with improved animation
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTopBtn);
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Update scroll indicator and back to top button on scroll with smoother animation
    window.addEventListener('scroll', function() {
        // Update scroll indicator
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        // Use requestAnimationFrame for smoother animation
        requestAnimationFrame(() => {
            scrollIndicator.style.width = scrollPercentage + '%';
            
            // Show/hide back to top button with smoother transition
            if (scrollPosition > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    });
    
    // Enhanced form input styling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Add input focus effects with improved animation
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            
            // Add focused class when input has value or is focused
            const checkInputValue = () => {
                if (input.value) {
                    formGroup.classList.add('has-value');
                } else {
                    formGroup.classList.remove('has-value');
                }
            };
            
            // Check initial value
            checkInputValue();
            
            input.addEventListener('focus', () => {
                formGroup.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                formGroup.classList.remove('focused');
                checkInputValue();
            });
            
            input.addEventListener('input', checkInputValue);
        });
        
        // Add loading state to submit button
        contactForm.addEventListener('submit', function() {
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        });
    }
    
    // Initialize new animations and features
    highlightNavLink();
    parallaxEffect();
    revealSections();
    animateFeatures();
    
    // Add service card hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon i');
            if (icon) {
                icon.classList.add('fa-spin');
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.icon i');
            if (icon) {
                icon.classList.remove('fa-spin');
            }
        });
    });
    
    // Animate counters when they come into view
    const statsSection = document.querySelector('.about-features');
    if (statsSection) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.unobserve(entries[0].target);
            }
        });
        
        observer.observe(statsSection);
    }
    
    // Add animation class to body after page loads
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 300);
    
    // Preload background images
    preloadBackgroundImages();
});

// Helper function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Helper function to validate phone format
function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
}

// Function to highlight active navigation link based on scroll position
function highlightNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const headerHeight = document.querySelector('header').offsetHeight;
            
            if (window.pageYOffset >= sectionTop - headerHeight - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
        
        // Check if we're at the top of the page
        if (window.pageYOffset < 100) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }
        
        // Function to check if element is in viewport
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        // Function to animate elements when they come into view
        function animateOnScroll() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            animatedElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('animated');
                }
            });
        }
        
        // Call the function on scroll
        animateOnScroll();
    });
}

// Add animated counters for statistics
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        
        let current = 0;
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.ceil(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Add parallax effect to hero section
function parallaxEffect() {
    const hero = document.getElementById('hero');
    
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }
}

// Add smooth reveal animations for sections
function revealSections() {
    const sections = document.querySelectorAll('section');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px'
    };
    
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, revealOptions);
    
    sections.forEach(section => {
        section.classList.add('section-hidden');
        sectionObserver.observe(section);
    });
}

// Function to animate features on scroll
function animateFeatures() {
    const features = document.querySelectorAll('.feature');
    
    features.forEach((feature, index) => {
        feature.style.animationDelay = `${index * 0.1}s`;
    });
}

// Preload background images to prevent glitching
function preloadBackgroundImages() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    // Add a loading class to the body
    document.body.classList.add('images-loading');
    
    // Get the background image URL from the computed style
    const computedStyle = window.getComputedStyle(heroSection);
    const backgroundImage = computedStyle.backgroundImage;
    
    // Extract the URL from the background-image property
    const urlMatch = /url\(['"]?([^'"]+)['"]?\)/g.exec(backgroundImage);
    if (!urlMatch || !urlMatch[1]) {
        document.body.classList.remove('images-loading');
        document.body.classList.add('bg-loaded');
        return;
    }
    
    // Preload the image
    const img = new Image();
    img.src = urlMatch[1];
    
    // When the image is loaded, add a class to the body
    img.onload = function() {
        document.body.classList.remove('images-loading');
        document.body.classList.add('bg-loaded');
        console.log('Background image loaded');
    };
    
    // If image takes too long, still remove loading class after 3 seconds
    setTimeout(() => {
        if (document.body.classList.contains('images-loading')) {
            document.body.classList.remove('images-loading');
            document.body.classList.add('bg-loaded');
            console.log('Background image load timeout');
        }
    }, 3000);
    
    // Preload all other images
    preloadContentImages();
}

// Preload content images
function preloadContentImages() {
    // Find all images that aren't already loaded
    const images = document.querySelectorAll('img:not([loading="eager"])');
    
    // Add lazy loading attribute to all images
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add width and height if not present to prevent layout shifts
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
    });
}

// Debounce function to limit how often a function is called during events like scrolling
function debounce(func, wait = 10, immediate = true) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        body.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('nav');
        const isClickOnMenuBtn = event.target.closest('.mobile-menu-btn');
        
        if (!isClickInsideNav && !isClickOnMenuBtn && body.classList.contains('mobile-menu-open')) {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        }
    });
}
