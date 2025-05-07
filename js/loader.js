  // Wait for window load
  window.addEventListener('load', function() {
    // Add small delay for smooth transition
    setTimeout(function() {
        document.body.classList.add('loaded');
        
        // Remove loader from DOM after animation completes
        setTimeout(function() {
            document.querySelector('.page-loader').remove();
        }, 500); // Match this with the CSS transition duration
    }, 500);
});