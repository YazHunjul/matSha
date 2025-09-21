// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(125, 132, 113, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections for scroll animations
    document.querySelectorAll('.about-card, .product-card, .testimonial-card, .benefit-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = new FormData(this);
            const formValues = {};

            // Collect form values
            const inputs = this.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                if (input.type !== 'submit') {
                    formValues[input.name || input.placeholder] = input.value;
                }
            });

            // Simple validation
            let isValid = true;
            let errorMessage = '';

            inputs.forEach(input => {
                if (input.hasAttribute('required') && !input.value.trim()) {
                    isValid = false;
                    errorMessage = 'Please fill in all required fields.';
                    input.style.borderColor = '#e74c3c';
                } else {
                    input.style.borderColor = '#E9ECEF';
                }
            });

            // Email validation
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(emailInput.value)) {
                    isValid = false;
                    errorMessage = 'Please enter a valid email address.';
                    emailInput.style.borderColor = '#e74c3c';
                }
            }

            if (isValid) {
                // Show success message
                showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
                this.reset();
            } else {
                // Show error message
                showNotification(errorMessage, 'error');
            }
        });
    }

    // Product card interactions
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.product-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = productCard.querySelector('.price').textContent;

            // Add ripple effect
            createRipple(this, event);

            // Show add to cart notification
            showNotification(`${productName} added to cart! (${productPrice})`, 'success');

            // Update button temporarily
            const originalText = this.textContent;
            this.textContent = 'Added ✓';
            this.style.background = '#28a745';

            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
        });
    });

    // Hero buttons functionality
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
        btn.addEventListener('click', function(e) {
            if (this.textContent.includes('Shop Now')) {
                e.preventDefault();
                document.querySelector('#products').scrollIntoView({
                    behavior: 'smooth'
                });
            } else if (this.textContent.includes('Learn More')) {
                e.preventDefault();
                document.querySelector('#about').scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });

    // Counter animation for the benefits circle
    const circleContent = document.querySelector('.circle-content h3');
    if (circleContent) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(circleContent, 137);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(circleContent);
    }

    // Social media links functionality
    document.querySelectorAll('.social-icons a, .footer-social a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.querySelector('i').className;
            let message = '';

            if (platform.includes('instagram')) {
                message = 'Instagram page coming soon! Follow us for daily matcha inspiration 📸';
            } else if (platform.includes('tiktok')) {
                message = 'TikTok page coming soon! Watch for matcha recipes and tips 🎵';
            } else if (platform.includes('whatsapp')) {
                message = 'WhatsApp us at +971 50 123 4567 for quick orders! 💬';
            } else if (platform.includes('snapchat')) {
                message = 'Snapchat coming soon! Snap your matcha moments 👻';
            }

            showNotification(message, 'info');
        });
    });

    // Phone number click functionality
    document.querySelectorAll('a[href^="tel:"], .contact-item p').forEach(element => {
        if (element.textContent.includes('+971')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('+971501234567').then(() => {
                        showNotification('Phone number copied to clipboard!', 'success');
                    });
                } else {
                    showNotification('Call us at +971 50 123 4567', 'info');
                }
            });
        }
    });

    // Email click functionality
    document.querySelectorAll('.contact-item p').forEach(element => {
        if (element.textContent.includes('@')) {
            element.style.cursor = 'pointer';
            element.addEventListener('click', function() {
                if (navigator.clipboard) {
                    navigator.clipboard.writeText('hello@matchashahd.ae').then(() => {
                        showNotification('Email address copied to clipboard!', 'success');
                    });
                } else {
                    showNotification('Send us an email at hello@matchashahd.ae', 'info');
                }
            });
        }
    });
});

// Utility Functions

// Show notification function
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : type === 'error' ? '#721c24' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : type === 'error' ? '#f5c6cb' : '#bee5eb'};
        border-radius: 10px;
        padding: 1rem 1.5rem;
        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
        z-index: 10000;
        max-width: 300px;
        animation: slideInRight 0.3s ease;
        font-family: 'Poppins', sans-serif;
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: 10px;
        opacity: 0.7;
    `;

    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Create ripple effect
function createRipple(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.6);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

// Animate counter
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 60; // 60 frames for smooth animation
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + 'x';
    }, 16); // ~60fps
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
    }

    .hamburger.active span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
    }

    .nav-menu.active {
        left: 0;
    }

    /* Hover effects for interactive elements */
    .contact-item p:hover {
        color: var(--primary-green) !important;
        transition: color 0.3s ease;
    }

    .social-icons a:hover,
    .footer-social a:hover {
        transform: translateY(-3px) scale(1.1);
    }

    /* Enhanced product card animations */
    .product-card {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .product-card:hover .product-image {
        transform: scale(1.05);
        transition: transform 0.3s ease;
    }

    .product-image {
        transition: transform 0.3s ease;
        overflow: hidden;
    }
`;

document.head.appendChild(style);

// Loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Enhanced scroll animations
function addScrollAnimations() {
    const elements = document.querySelectorAll('.section-header, .about-card, .product-card, .testimonial-card, .benefit-item');

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-animated');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        scrollObserver.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', addScrollAnimations);

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced scroll handler
const debouncedScrollHandler = debounce(function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);