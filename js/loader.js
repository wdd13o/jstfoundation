// Loader functionality
document.addEventListener('DOMContentLoaded', function() {
    const pageLoader = document.querySelector('.page-loader');
    
    // Show loader immediately
    pageLoader.style.display = 'flex';
    
    // Hide loader when all page resources are loaded
    window.addEventListener('load', function() {
        // Add 'hidden' class to trigger fade-out
        pageLoader.classList.add('hidden');
        
        // Remove loader from DOM after fade-out completes
        setTimeout(function() {
            pageLoader.style.display = 'none';
        }, 500); // Match this duration with the CSS transition time
    });
    
    // Fallback - hide loader after 5 seconds even if page doesn't fully load
    setTimeout(function() {
        if (pageLoader.style.display !== 'none') {
            pageLoader.classList.add('hidden');
            setTimeout(function() {
                pageLoader.style.display = 'none';
            }, 500);
        }
    }, 5000);
});