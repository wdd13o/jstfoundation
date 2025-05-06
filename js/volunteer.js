document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion functionality
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            
            if (this.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
            
            // Close other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.classList.contains('active')) {
                    q.classList.remove('active');
                    q.nextElementSibling.style.maxHeight = '0';
                }
            });
        });
    });
    
    // Form submission handling
    const volunteerForm = document.getElementById('volunteerApplicationForm');
    
    if (volunteerForm) {
        volunteerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form elements
            const submitButton = this.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            // Validate required fields
            const requiredFields = this.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ff4444';
                    isValid = false;
                    
                    field.addEventListener('input', function() {
                        this.style.borderColor = '#ddd';
                    }, { once: true });
                }
            });
            
            if (!isValid) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Simulate form submission
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
            
            setTimeout(() => {
                // Show success message
                alert('Thank you for your application! We will review your information and contact you soon.');
                
                // Reset form
                this.reset();
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
                
                // Scroll to top of form
                this.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Add visual confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'form-confirmation';
                confirmation.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <p>Application submitted successfully!</p>
                `;
                this.appendChild(confirmation);
                
                setTimeout(() => {
                    confirmation.style.opacity = '0';
                    setTimeout(() => confirmation.remove(), 300);
                }, 3000);
            }, 1500);
        });
    }
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.benefit-card, .opportunity-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 0.6s forwards ${entry.target.dataset.delay || '0s'}`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.dataset.delay = `${index * 0.1}s`;
            observer.observe(element);
        });
    };
    
    // Initialize animations
    animateOnScroll();
});

document.getElementById("volunteerApplicationForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const formData = {
        fullName: document.getElementById("fullName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        interest: document.getElementById("interest").value,
        availability: Array.from(document.querySelectorAll("input[name='availability']:checked"))
            .map(input => input.value)
            .join(", "),
        experience: document.getElementById("experience").value,
        motivation: document.getElementById("motivation").value,
    };

    // Initialize EmailJS
    emailjs.init("kallonbundujr99@gmail.com"); // Replace with your actual EmailJS User ID

    // Send email using EmailJS
    emailjs.send("service_ly0y3k4", "template_7yzp138", formData)
        .then(function () {
            alert("Application submitted successfully!");
        })
        .catch(function (error) {
            alert("Failed to send application. Please try again later.");
            console.error("EmailJS Error:", error);
        });
});