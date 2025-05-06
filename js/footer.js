document.addEventListener('DOMContentLoaded', function() {
    // Add floating elements to footer background
    const footer = document.querySelector('.footer');
    
    // Create floating elements
    for (let i = 0; i < 10; i++) {
        const element = document.createElement('div');
        element.classList.add('floating-element');
        
        // Random size between 20px and 100px
        const size = Math.random() * 80 + 20;
        element.style.width = `${size}px`;
        element.style.height = `${size}px`;
        
        // Random position
        element.style.left = `${Math.random() * 100}%`;
        element.style.top = `${Math.random() * 100}%`;
        
        // Random animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        element.style.animation = `float ${duration}s ease-in-out ${delay}s infinite alternate`;
        
        footer.appendChild(element);
    }
    
    // Add animation for newsletter input focus
    const newsletterInput = document.querySelector('.footer input[type="email"]');
    const newsletterBtn = document.querySelector('.footer button');
    
    if (newsletterInput && newsletterBtn) {
        newsletterInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.transition = 'transform 0.3s ease';
        });
        
        newsletterInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
        
        newsletterBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        newsletterBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }
    
    // Add hover effect to all links
    const footerLinks = document.querySelectorAll('.footer a');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) { // Only on desktop
                this.style.transition = 'transform 0.3s ease, color 0.3s ease';
            }
        });
    });
    
    // Add last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = new Date(document.lastModified).toLocaleDateString();
    }
    
    // Add keyframe animation for floating elements
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% {
                transform: translate(0, 0) rotate(0deg);
                opacity: 0.05;
            }
            50% {
                opacity: 0.1;
            }
            100% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 360}deg);
                opacity: 0.03;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll animation for footer reveal
    const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                footerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    footerObserver.observe(footer);
});



document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterInput = document.querySelector('.newsletter-input');
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const formMessage = document.querySelector('.form-message');
    const successMessage = document.querySelector('.newsletter-success');

    if (newsletterForm) {
        // Form submission handler
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validate email
            const email = newsletterInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!email) {
                showMessage('Please enter your email address', 'error');
                return;
            }
            
            if (!emailRegex.test(email)) {
                showMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Simulate form submission (replace with actual AJAX call)
            showMessage('Subscribing...', 'info');
            newsletterBtn.disabled = true;
            
            setTimeout(() => {
                // On success
                newsletterForm.reset();
                successMessage.classList.add('active');
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('active');
                    newsletterBtn.disabled = false;
                }, 5000);
            }, 1500);
        });
        
        // Input focus effect
        newsletterInput.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
            this.parentElement.style.boxShadow = '0 5px 15px rgba(78, 115, 223, 0.2)';
        });
        
        newsletterInput.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
            this.parentElement.style.boxShadow = 'none';
        });
    }
    
    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.style.color = type === 'error' ? '#ff6b6b' : '#4e73df';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
        }, 5000);
    }
});