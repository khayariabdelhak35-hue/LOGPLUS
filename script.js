// ===== Mobile Menu Toggle =====
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// ===== Smooth Scroll =====
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

// ===== Active Navigation =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-desktop a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== Stats Section - No animation needed, items visible by default =====

// ===== Scroll Animations =====
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

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// ===== Contact Form Handling =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Form Data:', data);
    
    // Show success message
    showNotification('Merci pour votre message! Nous vous contacterons bientôt.', 'success');
    
    // Reset form
    this.reset();
});

// ===== Notification System =====
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#2ecc71' : '#e74c3c'};
        color: white;
        padding: 20px 30px;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        gap: 15px;
        font-weight: 500;
        z-index: 10000;
        animation: slideInRight 0.5s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
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
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== Header Scroll Effect =====
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== Lazy Loading Images =====
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===== Print Functionality =====
function printPage() {
    window.print();
}

// ===== Back to Top Button =====
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.2em;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    z-index: 1000;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
`;

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.opacity = '1';
        backToTopButton.style.visibility = 'visible';
    } else {
        backToTopButton.style.opacity = '0';
        backToTopButton.style.visibility = 'hidden';
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px)';
    backToTopButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
});

// ===== Hero Slider =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance slides every 5 seconds
if (slides.length > 0) {
    setInterval(nextSlide, 5000);
}

// ===== About Section Slider =====
let currentAboutSlideIndex = 0;
const aboutSlides = document.querySelectorAll('.about-slide');
const aboutDots = document.querySelectorAll('.about-slider-dots .dot');
const totalAboutSlides = aboutSlides.length;

function showAboutSlide(index) {
    // Remove active class from all slides and dots
    aboutSlides.forEach(slide => slide.classList.remove('active'));
    aboutDots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to current slide and dot
    if (aboutSlides[index]) {
        aboutSlides[index].classList.add('active');
    }
    if (aboutDots[index]) {
        aboutDots[index].classList.add('active');
    }
}

function changeAboutSlide(direction) {
    currentAboutSlideIndex += direction;
    
    if (currentAboutSlideIndex >= totalAboutSlides) {
        currentAboutSlideIndex = 0;
    } else if (currentAboutSlideIndex < 0) {
        currentAboutSlideIndex = totalAboutSlides - 1;
    }
    
    showAboutSlide(currentAboutSlideIndex);
}

function currentAboutSlide(index) {
    currentAboutSlideIndex = index;
    showAboutSlide(currentAboutSlideIndex);
}

// Auto-advance about slides every 4 seconds
if (aboutSlides.length > 0) {
    setInterval(() => {
        changeAboutSlide(1);
    }, 4000);
}

// ===== Contact Form Email with EmailJS =====
function sendEmail(event) {
    event.preventDefault();
    
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    // Show loading state
    submitButton.textContent = 'Envoi en cours...';
    submitButton.disabled = true;
    
    // Get form values
    const templateParams = {
        from_name: document.getElementById('contactName').value,
        from_email: document.getElementById('contactEmail').value,
        phone: document.getElementById('contactPhone').value,
        service: document.getElementById('contactService').value,
        message: document.getElementById('contactMessage').value,
        to_email: 'Abdelhakkhayari00@gmail.com'
    };
    
    // Send email using EmailJS
    emailjs.send('service_60pltu4', 'template_w0cf46u', templateParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            alert('✅ Message envoyé avec succès! Nous vous contacterons bientôt.');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, function(error) {
            console.log('FAILED...', error);
            
            // Fallback to mailto if EmailJS fails
            const name = templateParams.from_name;
            const email = templateParams.from_email;
            const phone = templateParams.phone;
            const service = templateParams.service;
            const message = templateParams.message;
            
            const subject = `Demande de contact - ${service}`;
            const body = `Nom: ${name}%0D%0A` +
                         `Email: ${email}%0D%0A` +
                         `Téléphone: ${phone}%0D%0A` +
                         `Service demandé: ${service}%0D%0A%0D%0A` +
                         `Message:%0D%0A${message}`;
            
            window.location.href = `mailto:Abdelhakkhayari00@gmail.com?subject=${subject}&body=${body}`;
            
            alert('⚠️ Erreur d\'envoi. Votre client email va s\'ouvrir.');
            
            // Reset button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        });
}

// ===== Console Welcome Message =====
console.log('%c🌍 LOGPLUS - Expert en Hydrogéologie', 'color: #1a5490; font-size: 20px; font-weight: bold;');
console.log('%cSite web développé avec ❤️', 'color: #2ecc71; font-size: 14px;');
