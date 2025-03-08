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
            body.classList.toggle('menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                body.classList.remove('menu-open');
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
    
    // Enhanced form submission handling
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
        
        // Service selection highlight
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            serviceSelect.addEventListener('change', function() {
                if (this.value) {
                    this.classList.add('selected');
                } else {
                    this.classList.remove('selected');
                }
            });
        }
        
        // Form validation with improved error handling
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate form with improved error handling
            let isValid = true;
            const requiredInputs = contactForm.querySelectorAll('[required]');
            
            requiredInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                    const formGroup = input.parentElement;
                    
                    // Add error message if it doesn't exist
                    if (!formGroup.querySelector('.error-message')) {
                        const errorMessage = document.createElement('div');
                        errorMessage.className = 'error-message';
                        errorMessage.textContent = 'This field is required';
                        formGroup.appendChild(errorMessage);
                        
                        // Add animation to error message
                        errorMessage.style.opacity = '0';
                        errorMessage.style.transform = 'translateY(-5px)';
                        
                        setTimeout(() => {
                            errorMessage.style.opacity = '1';
                            errorMessage.style.transform = 'translateY(0)';
                        }, 10);
                    }
                } else {
                    input.classList.remove('error');
                    const errorMessage = input.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
            
            // Validate email format
            const emailInput = document.getElementById('email');
            if (emailInput && emailInput.value.trim() && !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.classList.add('error');
                const formGroup = emailInput.parentElement;
                
                if (!formGroup.querySelector('.error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid email address';
                    formGroup.appendChild(errorMessage);
                    
                    errorMessage.style.opacity = '0';
                    errorMessage.style.transform = 'translateY(-5px)';
                    
                    setTimeout(() => {
                        errorMessage.style.opacity = '1';
                        errorMessage.style.transform = 'translateY(0)';
                    }, 10);
                }
            }
            
            // Validate phone format if provided
            const phoneInput = document.getElementById('phone');
            if (phoneInput && phoneInput.value.trim() && !isValidPhone(phoneInput.value)) {
                isValid = false;
                phoneInput.classList.add('error');
                const formGroup = phoneInput.parentElement;
                
                if (!formGroup.querySelector('.error-message')) {
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    errorMessage.textContent = 'Please enter a valid phone number';
                    formGroup.appendChild(errorMessage);
                    
                    errorMessage.style.opacity = '0';
                    errorMessage.style.transform = 'translateY(-5px)';
                    
                    setTimeout(() => {
                        errorMessage.style.opacity = '1';
                        errorMessage.style.transform = 'translateY(0)';
                    }, 10);
                }
            }
            
            if (!isValid) return;
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Get form data
                const formData = new FormData(this);
                const formDataObj = {};
                formData.forEach((value, key) => {
                    formDataObj[key] = value;
                });
                
                // Hide form and show success message
                contactForm.style.display = 'none';
                
                // Create success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <h3>Thank You!</h3>
                    <p>Your message has been sent successfully. We'll get back to you within 24 hours.</p>
                    <button class="return-btn">Send Another Message</button>
                `;
                
                contactForm.parentElement.appendChild(successMessage);
                
                // Add event listener to return button
                const returnBtn = successMessage.querySelector('.return-btn');
                returnBtn.addEventListener('click', () => {
                    // Reset form
                    contactForm.reset();
                    formInputs.forEach(input => {
                        input.classList.remove('error');
                        const formGroup = input.parentElement;
                        formGroup.classList.remove('has-value');
                        const errorMessage = formGroup.querySelector('.error-message');
                        if (errorMessage) {
                            errorMessage.remove();
                        }
                    });
                    
                    // Show form again
                    successMessage.remove();
                    contactForm.style.display = 'block';
                    
                    // Reset button
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                });
                
            }, 2000); // Simulate 2 second delay for form submission
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
    
    // Get the background image URL from the computed style
    const computedStyle = window.getComputedStyle(heroSection);
    const backgroundImage = computedStyle.backgroundImage;
    
    // Extract the URL from the background-image property
    const urlMatch = /url\(['"]?([^'"]+)['"]?\)/g.exec(backgroundImage);
    if (!urlMatch || !urlMatch[1]) return;
    
    // Preload the image
    const img = new Image();
    img.src = urlMatch[1];
    
    // When the image is loaded, add a class to the body
    img.onload = function() {
        document.body.classList.add('bg-loaded');
        console.log('Background image loaded');
    };
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

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Smooth scroll for anchor links
    initSmoothScroll();
    
    // Initialize scroll indicator
    initScrollIndicator();
    
    // Initialize back to top button
    initBackToTop();
    
    // Initialize form validation
    initFormValidation();
    
    // Preload background images
    preloadBackgroundImages();
    
    // Initialize animations
    animateCounters();
    revealSections();
    animateFeatures();
    
    // Initialize scroll events with debounce
    window.addEventListener('scroll', debounce(function() {
        highlightNavLink();
    }));
});

// Initialize mobile menu
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const body = document.body;
    
    if (!mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', function() {
        body.classList.toggle('mobile-menu-open');
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            body.classList.remove('mobile-menu-open');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = event.target.closest('nav');
        const isClickOnMenuBtn = event.target.closest('.mobile-menu-btn');
        
        if (!isClickInsideNav && !isClickOnMenuBtn && body.classList.contains('mobile-menu-open')) {
            body.classList.remove('mobile-menu-open');
        }
    });
}