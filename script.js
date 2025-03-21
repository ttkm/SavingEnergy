document.addEventListener('DOMContentLoaded', function() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.add('is-mobile');
        document.body.classList.add('loaded');
        document.body.classList.add('bg-loaded');
        document.body.classList.add('images-loaded');
    }
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    const body = document.body;
    let scrollY;
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            this.classList.toggle('active');
            nav.classList.toggle('active');
            body.classList.toggle('mobile-menu-open');
            
            if (body.classList.contains('mobile-menu-open')) {
                body.style.paddingRight = window.innerWidth - document.documentElement.clientWidth + 'px';
            } else {
                body.style.paddingRight = '';
            }
        });
    }
    
    document.addEventListener('click', function(e) {
        if (nav.classList.contains('active') && 
            !nav.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('mobile-menu-open');
            body.style.paddingRight = '';
        }
    });
    
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (nav.classList.contains('active')) {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('mobile-menu-open');
                body.style.paddingRight = '';
            }
        });
    });
    
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(nav a)');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    document.body.appendChild(scrollIndicator);
    
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
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const totalHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercentage = (scrollPosition / totalHeight) * 100;
        
        requestAnimationFrame(() => {
            scrollIndicator.style.width = scrollPercentage + '%';
            
            if (scrollPosition > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
    });
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            const formGroup = input.parentElement;
            
            const checkInputValue = () => {
                if (input.value) {
                    formGroup.classList.add('has-value');
                } else {
                    formGroup.classList.remove('has-value');
                }
            };
            
            checkInputValue();
            
            input.addEventListener('focus', () => {
                formGroup.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                formGroup.classList.remove('focused');
                checkInputValue();
                
                if (input.value) {
                    if (input.id === 'email' && !isValidEmail(input.value)) {
                        formGroup.classList.add('has-error');
                        input.setCustomValidity('Please enter a valid email address');
                    } else if (input.id === 'phone' && input.value && !isValidPhone(input.value)) {
                        formGroup.classList.add('has-error');
                        input.setCustomValidity('Please enter a valid phone number');
                    } else {
                        formGroup.classList.remove('has-error');
                        input.setCustomValidity('');
                    }
                }
            });
            
            input.addEventListener('input', () => {
                checkInputValue();
                formGroup.classList.remove('has-error');
                input.setCustomValidity('');
            });
        });
        
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const emailInput = document.getElementById('email');
            const phoneInput = document.getElementById('phone');
            
            if (emailInput && !isValidEmail(emailInput.value)) {
                emailInput.parentElement.classList.add('has-error');
                emailInput.setCustomValidity('Please enter a valid email address');
                isValid = false;
            }
            
            if (phoneInput && phoneInput.value && !isValidPhone(phoneInput.value)) {
                phoneInput.parentElement.classList.add('has-error');
                phoneInput.setCustomValidity('Please enter a valid phone number');
                isValid = false;
            }
            
            if (!isValid) {
                e.preventDefault();
                return false;
            }
            
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        });
        
        const adjustFormForMobile = () => {
            const formWidth = contactForm.offsetWidth;
            const formRows = contactForm.querySelectorAll('.form-row');
            
            if (formWidth < 500) {
                formRows.forEach(row => {
                    row.style.display = 'block';
                });
            } else {
                formRows.forEach(row => {
                    row.style.display = 'grid';
                });
            }
        };
        
        adjustFormForMobile();
        window.addEventListener('resize', debounce(adjustFormForMobile));
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\d\s\-\(\)\.+]+$/;
        return phoneRegex.test(phone);
    }
    
    highlightNavLink();
    parallaxEffect();
    revealSections();
    animateFeatures();
    
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
    
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, isMobile ? 100 : 300);
    
    preloadBackgroundImages();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    return phoneRegex.test(phone);
}

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
        
        if (window.pageYOffset < 100) {
            navLinks.forEach(link => {
                if (link.getAttribute('href') === '#hero') {
                    link.classList.add('active');
                }
            });
        }
        
        function isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        }
        
        function animateOnScroll() {
            const animatedElements = document.querySelectorAll('.animate-on-scroll');
            
            animatedElements.forEach(element => {
                if (isInViewport(element)) {
                    element.classList.add('animated');
                }
            });
        }
        
        animateOnScroll();
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const increment = target / (duration / 16);
        
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

function parallaxEffect() {
    const hero = document.getElementById('hero');
    
    if (hero) {
        const isMobile = window.innerWidth <= 768;
        
        if (!isMobile) {
            window.addEventListener('scroll', () => {
                const scrollPosition = window.pageYOffset;
                hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
            });
        } else {
            hero.style.backgroundPositionY = 'center';
        }
        
        window.addEventListener('resize', () => {
            const isMobileNow = window.innerWidth <= 768;
            if (isMobileNow) {
                hero.style.backgroundPositionY = 'center';
            }
        });
    }
}

function revealSections() {
    const sections = document.querySelectorAll('section');
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        sections.forEach(section => {
            section.classList.add('revealed');
        });
        return;
    }
    
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

function animateFeatures() {
    animateAboutSection();
}

function animateAboutSection() {
    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const elements = aboutSection.querySelectorAll('.about-images-container, .about-image, .about-image-secondary, .about-text, .about-text-container, .mission, .vision');
        
        elements.forEach(element => {
            element.classList.add('animated');
            if (element.classList.contains('about-image') || element.classList.contains('about-image-secondary')) {
                element.style.opacity = '1';
            }
        });
        
        return;
    }
    
    const aboutObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            const aboutImagesContainer = aboutSection.querySelector('.about-images-container');
            const aboutImage = aboutSection.querySelector('.about-image');
            const aboutImageSecondary = aboutSection.querySelector('.about-image-secondary');
            const aboutText = aboutSection.querySelector('.about-text');
            const aboutTextContainer = aboutSection.querySelector('.about-text-container');
            const missionVision = aboutSection.querySelectorAll('.mission, .vision');
            
            if (aboutImagesContainer) {
                setTimeout(() => {
                    aboutImagesContainer.classList.add('revealed');
                }, 200);
            }
            
            if (aboutImage) {
                setTimeout(() => {
                    aboutImage.classList.add('animated');
                    aboutImage.style.opacity = '1';
                }, 300);
            }
            
            if (aboutImageSecondary) {
                setTimeout(() => {
                    aboutImageSecondary.classList.add('animated');
                    aboutImageSecondary.style.opacity = '1';
                }, 500);
            }
            
            if (aboutTextContainer) {
                setTimeout(() => {
                    aboutTextContainer.classList.add('animated');
                }, 300);
            }
            
            if (aboutText) {
                setTimeout(() => {
                    aboutText.classList.add('animated');
                }, 200);
            }
            
            missionVision.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('animated');
                }, 600 + (index * 200));
            });
            
            aboutObserver.unobserve(entries[0].target);
        }
    }, { threshold: 0.2 });
    
    aboutObserver.observe(aboutSection);
}

function preloadBackgroundImages() {
    const heroSection = document.getElementById('hero');
    if (!heroSection) return;
    
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        document.body.classList.remove('images-loading');
        document.body.classList.add('bg-loaded');
        return;
    }
    
    document.body.classList.add('images-loading');

    const computedStyle = window.getComputedStyle(heroSection);
    const backgroundImage = computedStyle.backgroundImage;
    
    const urlMatch = /url\(['"]?([^'"]+)['"]?\)/g.exec(backgroundImage);
    if (!urlMatch || !urlMatch[1]) {
        document.body.classList.remove('images-loading');
        document.body.classList.add('bg-loaded');
        return;
    }
    
    const img = new Image();
    img.src = urlMatch[1];
    
    img.onload = function() {
        document.body.classList.remove('images-loading');
        document.body.classList.add('bg-loaded');
    };
    
    setTimeout(() => {
        if (document.body.classList.contains('images-loading')) {
            document.body.classList.remove('images-loading');
            document.body.classList.add('bg-loaded');
        }
    }, isMobile ? 1000 : 3000);
    
    preloadContentImages();
}

function preloadContentImages() {
    const images = document.querySelectorAll('img:not([loading="eager"])');
    let loadedImagesCount = 0;
    const totalImages = images.length;
    
    images.forEach(img => {
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
            img.style.maxWidth = '100%';
            img.style.height = 'auto';
        }
        
        img.addEventListener('load', function() {
            this.classList.add('loaded');
            loadedImagesCount++;
            
            if (this.closest('.about-image')) {
                const aboutImageContainer = this.closest('.about-image');
                aboutImageContainer.style.opacity = '1';
            }
            
            if (loadedImagesCount === totalImages) {
                document.body.classList.add('images-loaded');
            }
        });
        
        img.addEventListener('error', function() {
            loadedImagesCount++;
            
            if (this.closest('.about-image')) {
                this.closest('.about-image').classList.add('image-error');
            }
            
            if (loadedImagesCount === totalImages) {
                document.body.classList.add('images-loaded');
            }
        });
    });
}

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

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
            body.classList.remove('mobile-menu-open');
        });
    });

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


