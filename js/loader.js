   // First make sure content is hidden
   document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.content').style.display = 'none';
});

// When everything is loaded
window.addEventListener('load', function() {
    // Show content
    document.querySelector('.content').style.display = 'block';
    
    // Add small delay for smooth transition
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove loader from DOM after animation completes
        setTimeout(function() {
            const loader = document.querySelector('.page-loader');
            if (loader) loader.remove();
        }, 500);
    }, 300);
});

// Fallback in case load event doesn't fire
setTimeout(function() {
    if (!document.body.classList.contains('loaded')) {
        document.body.classList.add('loaded');
        document.querySelector('.content').style.display = 'block';
        const loader = document.querySelector('.page-loader');
        if (loader) loader.remove();
    }
}, 5000); // 5 second timeout