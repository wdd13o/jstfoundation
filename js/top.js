document.addEventListener('DOMContentLoaded', function() {
  const backToTop = document.getElementById('backToTop');
  const scrollThreshold = 300; // Pixels before button appears
  const scrollDuration = 500; // Smooth scroll duration
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', function() {
    if (window.pageYOffset > scrollThreshold) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  });
  
  // Smooth scroll to top
  backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Modern smooth scrolling (supported in most browsers)
    if ('scrollBehavior' in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } 
    // Fallback for older browsers
    else {
      const start = window.pageYOffset;
      const startTime = performance.now();
      
      function scrollStep(timestamp) {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / scrollDuration, 1);
        window.scrollTo(0, start * (1 - easeOutCubic(progress)));
        
        if (progress < 1) {
          window.requestAnimationFrame(scrollStep);
        }
      }
      
      function easeOutCubic(t) {
        return (--t) * t * t + 1;
      }
      
      window.requestAnimationFrame(scrollStep);
    }
  });
  
  // Touch devices support
  backToTop.addEventListener('touchstart', function() {
    this.classList.add('active');
  });
  
  backToTop.addEventListener('touchend', function() {
    this.classList.remove('active');
  });
});