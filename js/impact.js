document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const storyCards = document.querySelectorAll('.story-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter stories
            storyCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.6s forwards';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Load more functionality (simulated)
    const loadMoreBtn = document.querySelector('.load-more-btn');
    let visibleCards = 6; // Initial number of visible cards
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, you would fetch more stories from a server
            // Here we're just simulating the effect
            this.textContent = 'Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                // Simulate adding 3 more cards
                visibleCards += 3;
                
                // In a real app, you would insert new cards here
                // For this demo, we'll just show a message
                if (visibleCards >= 9) { // Assuming we have 9+ stories in reality
                    this.textContent = 'All Stories Loaded';
                    this.style.opacity = '0.7';
                } else {
                    this.textContent = 'Load More Stories';
                    this.disabled = false;
                }
                
                // Show confirmation
                const confirmation = document.createElement('div');
                confirmation.className = 'load-confirmation';
                confirmation.textContent = 'Showing ' + visibleCards + ' stories';
                this.parentElement.insertBefore(confirmation, this);
                
                setTimeout(() => {
                    confirmation.style.opacity = '0';
                    setTimeout(() => confirmation.remove(), 300);
                }, 2000);
            }, 1000);
        });
    }
    
    // Animate cards on scroll
    const animateOnScroll = function() {
        const cards = document.querySelectorAll('.story-card');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 0.6s forwards ${entry.target.dataset.delay || '0s'}`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.dataset.delay = `${index * 0.1}s`;
            observer.observe(card);
        });
    };
    
    // Initialize animations
    animateOnScroll();
});