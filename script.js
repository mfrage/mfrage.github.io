// ==========================================
// SIGMA NU UGA - VERSION 2 JAVASCRIPT
// Enhanced interactivity and animations
// ==========================================

// ========== MOBILE NAVIGATION ==========
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#contact') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ========== STATS COUNTER ANIMATION ==========
const statsSection = document.querySelector('.stats-section');
let hasAnimated = false;

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60fps
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas if > 1000
        const displayValue = Math.floor(current);
        element.textContent = displayValue.toLocaleString();
    }, 16);
}

function checkStatsInView() {
    if (!statsSection || hasAnimated) return;
    
    const rect = statsSection.getBoundingClientRect();
    const isInView = rect.top < window.innerHeight && rect.bottom >= 0;
    
    if (isInView) {
        hasAnimated = true;
        const statNumbers = document.querySelectorAll('.stat-number');
        
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            animateCounter(stat, target);
        });
    }
}

// Check on scroll and on load
window.addEventListener('scroll', checkStatsInView);
window.addEventListener('load', checkStatsInView);

// ========== NAVBAR BACKGROUND ON SCROLL ==========
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow when scrolled
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe cards and sections for fade-in animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll(
        '.quick-link-card, .news-card, .event-card, .about-text, .about-image, .philanthropy-text, .philanthropy-images, .recruitment-info, .rush-chairs'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ========== NEWSLETTER FORM HANDLING ==========
const newsletterForm = document.querySelector('.newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = newsletterForm.querySelector('input[type="text"]').value;
        const lastName = newsletterForm.querySelectorAll('input[type="text"]')[1].value;
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Here you would typically send this to a server
        // For now, we'll just show a success message
        alert(`Thank you for signing up, ${firstName}! We'll keep you updated on Gamma Xi Chapter news and events.`);
        
        // Clear form
        newsletterForm.reset();
    });
}

// ========== LAZY LOADING IMAGES ==========
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
        }
    });
});

document.querySelectorAll('img').forEach(img => {
    imageObserver.observe(img);
});

// ========== ACTIVE NAVIGATION HIGHLIGHT ==========
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.style.color = '';
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-gold)';
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ========== BACK TO TOP BUTTON (Optional Enhancement) ==========
function createBackToTopButton() {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary-gold);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        font-size: 1.2rem;
    `;
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.background = 'var(--hover-gold)';
        button.style.transform = 'translateY(-5px)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.background = 'var(--primary-gold)';
        button.style.transform = 'translateY(0)';
    });
}

// Initialize back to top button
createBackToTopButton();

// ========== PRELOADER (Optional) ==========
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ========== LOG PAGE VISITS (Optional Analytics) ==========
function logPageVisit() {
    // This would typically send to an analytics service
    console.log('Page visited:', new Date().toLocaleString());
}

logPageVisit();

// ========== PARALLAX EFFECT FOR HERO ==========
const hero = document.querySelector('.hero');

if (hero) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        hero.style.backgroundPositionY = `${scrolled * parallaxSpeed}px`;
    });
}

// ========== EVENT CARD HOVER EFFECTS ==========
const eventCards = document.querySelectorAll('.event-card');

eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
    });
});

// ========== RECRUITMENT CHAIR CARD EFFECTS ==========
const rushChairCards = document.querySelectorAll('.rush-chair-card');

rushChairCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.05)';
            img.style.transition = 'transform 0.3s ease';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const img = card.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

console.log('Sigma Nu UGA v2.0 - Website loaded successfully!');

// ========== PHILANTHROPY CAROUSEL ==========
let currentSlideIndex = 1;
showSlide(currentSlideIndex);

function moveCarousel(n) {
    showSlide(currentSlideIndex += n);
}

function currentSlide(n) {
    showSlide(currentSlideIndex = n);
}

function showSlide(n) {
    let slides = document.querySelectorAll('.carousel-slide');
    let dots = document.querySelectorAll('.dot');
    
    if (!slides.length) return;
    
    if (n > slides.length) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = slides.length;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
}

// Auto-advance carousel every 6 seconds
setInterval(() => {
    moveCarousel(1);
}, 6000);

