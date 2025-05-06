  // Show text on larger screens
  function checkScreenSize() {
    const waText = document.getElementById('wa-text');
    if (window.innerWidth > 768) {
      waText.style.display = 'inline';
      document.getElementById('wa_btn-content').style.borderRadius = '25px';
      document.getElementById('wa_btn-content').style.padding = '12px 20px';
    } else {
      waText.style.display = 'none';
      document.getElementById('wa_btn-content').style.borderRadius = '100%';
      document.getElementById('wa_btn-content').style.padding = '12px';
    }
  }

  // Check on load and resize
  window.addEventListener('load', checkScreenSize);
  window.addEventListener('resize', checkScreenSize);