// Rain Toggle Functionality
const rainToggle = document.getElementById('rainToggle');
let isRaining = false;
let rainContainer = null;
let rainDroplets = [];

rainToggle.addEventListener('click', function() {
    isRaining = !isRaining;
    
    if (isRaining) {
        startRain();
        rainToggle.classList.add('active');
    } else {
        stopRain();
        rainToggle.classList.remove('active');
    }
});

function startRain() {
    // Create rain container if it doesn't exist
    if (!rainContainer) {
        rainContainer = document.createElement('div');
        rainContainer.className = 'rain-container';
        document.body.appendChild(rainContainer);
    }
    
    // Add rain-active class to body
    document.body.classList.add('rain-active');
    
    // Create falling raindrops
    const dropletCount = 200;
    
    for (let i = 0; i < dropletCount; i++) {
        setTimeout(() => {
            createRaindrop();
        }, i * 30);
    }
    
    // Continue creating raindrops
    const rainInterval = setInterval(() => {
        if (!isRaining) {
            clearInterval(rainInterval);
            return;
        }
        createRaindrop();
    }, 100);
}

function createRaindrop() {
    if (!isRaining || !rainContainer) return;
    
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop style' + (Math.floor(Math.random() * 3) + 1);
    
    const randomLeft = Math.random() * window.innerWidth;
    const randomDelay = Math.random() * 0.5;
    const randomDuration = 0.5 + Math.random() * 0.5;
    
    raindrop.style.left = randomLeft + 'px';
    raindrop.style.top = '-10px';
    raindrop.style.animationDuration = randomDuration + 's';
    raindrop.style.animationDelay = randomDelay + 's';
    
    rainContainer.appendChild(raindrop);
    
    // Remove raindrop after animation completes
    setTimeout(() => {
        if (raindrop.parentNode) {
            raindrop.parentNode.removeChild(raindrop);
        }
    }, (randomDuration + randomDelay) * 1000);
}

function stopRain() {
    isRaining = false;
    document.body.classList.remove('rain-active');
    
    if (rainContainer) {
        // Remove all raindrops
        const raindrops = rainContainer.querySelectorAll('.raindrop');
        raindrops.forEach(drop => {
            drop.remove();
        });
        
        // Remove rain container after a delay
        setTimeout(() => {
            if (rainContainer && rainContainer.parentNode) {
                rainContainer.parentNode.removeChild(rainContainer);
                rainContainer = null;
            }
        }, 1000);
    }
}

// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
if (currentTheme === 'dark') {
    body.classList.add('dark-theme');
    updateThemeIcon('light');
} else {
    body.classList.remove('dark-theme');
    updateThemeIcon('dark');
}

// Update theme icon
function updateThemeIcon(nextTheme) {
    const icon = themeToggle.querySelector('.theme-icon');
    if (nextTheme === 'dark') {
        icon.textContent = '🌙';
    } else {
        icon.textContent = '☀️';
    }
}

// Toggle theme
themeToggle.addEventListener('click', function() {
    body.classList.toggle('dark-theme');
    
    const isDark = body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon(isDark ? 'light' : 'dark');
    
    // Add animation
    this.style.animation = 'spin 0.6s ease';
    setTimeout(() => {
        this.style.animation = '';
    }, 600);
});

// Smooth scroll navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate numbers on scroll
function animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseFloat(target.getAttribute('data-target'));
                animateNumber(target, finalValue);
                observer.unobserve(target);
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        observer.observe(number);
    });
}

function animateNumber(element, target) {
    const duration = 2000; // 2 seconds
    const start = 0;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = (start + (target - start) * easeOutQuad(progress)).toFixed(1);
        element.textContent = current;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    function easeOutQuad(t) {
        return 1 - (1 - t) * (1 - t);
    }

    update();
}

// Intersection Observer for fade-in animations
function observeElements() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.classList.add('scroll-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.basic-card, .service-card, .model-card, .benefit-item').forEach(el => {
        observer.observe(el);
    });
}

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        
        // Create a nice feedback message
        const submitBtn = this.querySelector('.submit-button');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '✓ Message Sent!';
        submitBtn.style.background = '#4caf50';

        // Reset form
        setTimeout(() => {
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.style.background = '';
        }, 2000);
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.backgroundPosition = `center ${window.pageYOffset * 0.5}px`;
    }
});

// Add interactive hover effects to service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// CTA button click handler
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Create ripple effect on button clicks
function createRipple(event) {
    const button = event.currentTarget;

    // Create ripple element
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');

    // Add ripple styles if not already present
    if (!document.querySelector('style[data-ripple]')) {
        const style = document.createElement('style');
        style.setAttribute('data-ripple', 'true');
        style.textContent = `
            button {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes ripple-animation {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    button.appendChild(ripple);
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', createRipple);
});

// Dynamic gradient background animation
function animateGradientBackground() {
    const hero = document.querySelector('.hero');
    if (hero) {
        let angle = 0;
        setInterval(() => {
            angle += 0.5;
            hero.style.backgroundImage = `linear-gradient(${angle}deg, #667eea 0%, #764ba2 100%)`;
        }, 50);
    }
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    animateNumbers();
    observeElements();
    animateGradientBackground();

    // Add scroll reveal animations
    const revealElements = document.querySelectorAll('.basic-card, .service-card, .model-card, .benefit-item, .stat-card, .comparison-row');
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Close any open dropdowns or modals if needed
    }
});

// Prevent rapid clicks on CTA button
let isClicking = false;
if (ctaButton) {
    ctaButton.addEventListener('click', function(e) {
        if (isClicking) return;
        isClicking = true;
        setTimeout(() => { isClicking = false; }, 1000);
    });
}

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Detect scroll direction for animations
let lastScrollTop = 0;
let isScrollingDown = true;

window.addEventListener('scroll', function() {
    let currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScrollTop) {
        isScrollingDown = true;
    } else {
        isScrollingDown = false;
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

// Add stagger animation to cards
function staggerCards() {
    const cards = document.querySelectorAll('.basic-card, .service-card, .model-card, .benefit-item');
    cards.forEach((card, index) => {
        card.style.setProperty('--stagger-index', index);
    });
}

document.addEventListener('DOMContentLoaded', staggerCards);

// Interactive hover sound effect (visual feedback)
document.querySelectorAll('button, a, .interactive-card').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    element.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Collaborators Functionality
const collaboratorForm = document.getElementById('collaboratorForm');
const collaboratorsList = document.getElementById('collaboratorsList');
let collaborators = [];

// Load collaborators from localStorage on page load
function loadCollaborators() {
    const saved = localStorage.getItem('collaborators');
    if (saved) {
        collaborators = JSON.parse(saved);
        displayCollaborators();
    }
}

// Add new collaborator
collaboratorForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('collabName').value.trim();
    const prn = document.getElementById('collabPRN').value.trim();
    const role = document.getElementById('collabRole').value.trim();
    
    if (!name || !role) {
        alert('Please fill in Name and Role fields');
        return;
    }
    
    const collaborator = {
        id: Date.now(),
        name: name,
        prn: prn || 'N/A',
        role: role
    };
    
    collaborators.push(collaborator);
    saveCollaborators();
    displayCollaborators();
    
    // Reset form
    collaboratorForm.reset();
    
    // Show success feedback
    const button = this.querySelector('.add-collaborator-btn');
    const originalText = button.textContent;
    button.textContent = '✓ Added!';
    setTimeout(() => {
        button.textContent = originalText;
    }, 1500);
});

// Display collaborators
function displayCollaborators() {
    if (collaborators.length === 0) {
        collaboratorsList.innerHTML = '<p class="no-collaborators">No collaborators added yet. Add your friends!</p>';
        return;
    }
    
    collaboratorsList.innerHTML = '';
    collaborators.forEach((collab, index) => {
        const card = document.createElement('div');
        card.className = 'collaborator-card';
        card.style.animationDelay = (index * 0.1) + 's';
        
        card.innerHTML = `
            <div class="collaborator-name">${collab.name}</div>
            <div class="collaborator-role">${collab.role}</div>
            ${collab.prn !== 'N/A' ? `<div class="collaborator-prn"><strong>PRN:</strong> ${collab.prn}</div>` : ''}
            <button class="remove-collaborator" onclick="removeCollaborator(${collab.id})">Remove</button>
        `;
        
        collaboratorsList.appendChild(card);
    });
}

// Remove collaborator
function removeCollaborator(id) {
    collaborators = collaborators.filter(c => c.id !== id);
    saveCollaborators();
    displayCollaborators();
}

// Save collaborators to localStorage
function saveCollaborators() {
    localStorage.setItem('collaborators', JSON.stringify(collaborators));
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadCollaborators);

console.log('Cloud Computing Website Loaded Successfully! 🚀');
