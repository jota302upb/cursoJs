document.addEventListener('DOMContentLoaded', () => {
    // 0. Language Toggle System
    const langToggleBtn = document.getElementById('lang-toggle');
    let currentLang = localStorage.getItem('montesur_lang') || 'es';

    function setLanguage(lang) {
        currentLang = lang;
        localStorage.setItem('montesur_lang', lang);
        
        // Update toggle button text
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'es' ? 'EN' : 'ES';
        }

        // Apply translations
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }

    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            setLanguage(currentLang === 'es' ? 'en' : 'es');
        });
    }

    // Initialize language
    setLanguage(currentLang);

    // 1. Particle System
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 40;

    if (particlesContainer) {
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Random position
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            // Random size
            const size = Math.random() * 4 + 2 + 'px';
            particle.style.width = size;
            particle.style.height = size;
            
            // Random animation delay & duration
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (10 + Math.random() * 15) + 's';
            
            particlesContainer.appendChild(particle);
        }
    }

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Intersection Observer for Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                // If it's a metric item, start the counter
                if (entry.target.classList.contains('metric-item')) {
                    const valueEl = entry.target.querySelector('.metric-value');
                    const target = parseInt(valueEl.getAttribute('data-target'));
                    animateCounter(valueEl, target);
                }
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.service-card-flip, .metric-item, .about-grid, .section-title, .cta-final').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        revealObserver.observe(el);
    });

    // Apply animation classes
    document.addEventListener('scroll', () => {
        const scrolledElements = document.querySelectorAll('.animate-in');
        scrolledElements.forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    });

    // 4. Animated Counter function
    function animateCounter(element, target, duration = 2000) {
        let startTimestamp = null;
        const startValue = 0;
        
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentValue = Math.floor(progress * (target - startValue) + startValue);
            
            element.textContent = currentValue + (element.getAttribute('data-target') === '100' ? '%' : '');
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                element.textContent = target + (element.getAttribute('data-target') === '100' ? '%' : '');
            }
        };
        
        window.requestAnimationFrame(step);
    }

    // 5. Mobile Menu Toggle (Basic)
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            if (navLinks.style.display === 'flex') {
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(0,0,0,0.9)';
                navLinks.style.padding = '20px';
                navLinks.style.backdropFilter = 'blur(20px)';
            }
        });
    }

    // 6. Smooth Scroll for Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
