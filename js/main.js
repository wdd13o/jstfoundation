(function ($) {
    "use strict";

    // Spinner
   


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        const stickyTop = $('.sticky-top');
        if ($(this).scrollTop() > 300) {
            stickyTop.css('top', '0px');
        } else {
            stickyTop.css('top', '-100px');
        }
    });


    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";

    $(window).on("load resize", function () {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
                function () {
                    const $this = $(this);
                    $this.addClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "true");
                    $this.find($dropdownMenu).addClass(showClass);
                },
                function () {
                    const $this = $(this);
                    $this.removeClass(showClass);
                    $this.find($dropdownToggle).attr("aria-expanded", "false");
                    $this.find($dropdownMenu).removeClass(showClass);
                }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Back to top button
    $(window).scroll(function () {
        const backToTop = $('.back-to-top');
        if ($(this).scrollTop() > 300) {
            backToTop.fadeIn('slow');
        } else {
            backToTop.fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav: false,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 3
            }
        }
    });

})(jQuery);

document.addEventListener('DOMContentLoaded', function () {
    // Set last modified date
    const lastModifiedEl = document.getElementById('lastModified');
    if (lastModifiedEl) {
        lastModifiedEl.textContent = new Date(document.lastModified).toLocaleDateString();
    }

    // Header background animation
    const header = document.getElementById('animated-header');
    const backgrounds = [
        'url("https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        'url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")',
        'url("https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
    ];

    if (header) {
        let currentIndex = 0;
        header.style.backgroundImage = backgrounds[currentIndex];
        setInterval(() => {
            currentIndex = (currentIndex + 1) % backgrounds.length;
            header.style.backgroundImage = backgrounds[currentIndex];
        }, 5000);
    }

    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));

    // Set current year
    const currentYearEl = document.getElementById('currentYear');
    if (currentYearEl) {
        currentYearEl.textContent = new Date().getFullYear();
    }

    // Amount selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmount = document.getElementById('customAmount');

    amountOptions.forEach(option => {
        option.addEventListener('click', function () {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            if (customAmount) customAmount.value = '';
            updateSummary();
        });
    });

    if (customAmount) {
        customAmount.addEventListener('input', function () {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            updateSummary();
        });
    }

    // Donation type
    const donationType = document.getElementById('donationType');
    const otherSpecifyContainer = document.getElementById('otherSpecifyContainer');
    const otherSpecify = document.getElementById('otherSpecify');

    if (donationType) {
        donationType.addEventListener('change', function () {
            if (this.value === 'other') {
                if (otherSpecifyContainer) otherSpecifyContainer.style.display = 'block';
            } else {
                if (otherSpecifyContainer) otherSpecifyContainer.style.display = 'none';
            }
            updateSummary();
        });
    }

    // Payment method tabs
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const tabContents = document.querySelectorAll('.payment-tab-content');

    paymentTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            const tabId = this.getAttribute('data-tab');

            paymentTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            this.classList.add('active');
            const activeTab = document.getElementById(`${tabId}-tab`);
            if (activeTab) activeTab.classList.add('active');

            updatePaymentMethodSummary(tabId);
        });
    });

    // Form submissions
    const forms = [
        { id: 'creditCardForm', method: 'credit_card' },
        { id: 'orangeMoneyForm', method: 'orange_money' },
        { id: 'afrimoneyForm', method: 'afrimoney' },
        { id: 'paypalForm', method: 'paypal' },
        { id: 'binanceForm', method: 'binance' }
    ];

    forms.forEach(({ id, method }) => {
        const form = document.getElementById(id);
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();
                processDonation(method);
            });
        }
    });

    // Helper functions
    function updateSummary() {
        const amount = getSelectedAmount();
        const type = donationType && donationType.value === 'other' && otherSpecify ? otherSpecify.value : donationType.options[donationType.selectedIndex].text;

        const summaryAmount = document.getElementById('summaryAmount');
        const summaryType = document.getElementById('summaryType');
        const summaryTotal = document.getElementById('summaryTotal');

        if (summaryAmount) summaryAmount.textContent = `$${amount.toFixed(2)}`;
        if (summaryType) summaryType.textContent = type;
        if (summaryTotal) summaryTotal.textContent = `$${amount.toFixed(2)}`;
    }

    function updatePaymentMethodSummary(method) {
        const methodNames = {
            'credit-card': 'Credit Card',
            'orange-money': 'Orange Money',
            'afrimoney': 'AfriMoney',
            'paypal': 'PayPal',
            'binance': 'Binance'
        };

        const summaryMethod = document.getElementById('summaryMethod');
        if (summaryMethod) summaryMethod.textContent = methodNames[method] || '';
    }

    function getSelectedAmount() {
        const activeAmount = document.querySelector('.amount-option.active');
        if (activeAmount) {
            return parseFloat(activeAmount.getAttribute('data-amount')) || 0;
        } else if (customAmount && customAmount.value) {
            return parseFloat(customAmount.value) || 0;
        }
        return 0;
    }

    function processDonation(paymentMethod) {
        const amount = getSelectedAmount();
        if (amount <= 0) {
            showStatus('Please select or enter a valid donation amount', 'error');
            return;
        }

        const donationTypeValue = donationType && donationType.value === 'other' && otherSpecify ? otherSpecify.value : donationType.value;

        showStatus('Processing your donation...', 'warning');

        setTimeout(() => {
            const success = Math.random() > 0.2;

            if (success) {
                showStatus(`Thank you for your donation of $${amount.toFixed(2)}! A receipt has been sent to your email.`, 'success');
                resetForms();
            } else {
                showStatus('There was an error processing your payment. Please try again or contact support.', 'error');
            }
        }, 2000);
    }

    function showStatus(message, type) {
        const statusEl = document.getElementById('statusMessage');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = `status-message ${type}`;
            statusEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    function resetForms() {
        amountOptions.forEach(opt => opt.classList.remove('active'));
        if (customAmount) customAmount.value = '';
        if (donationType) donationType.value = 'general';
        if (otherSpecifyContainer) otherSpecifyContainer.style.display = 'none';
        if (otherSpecify) otherSpecify.value = '';

        forms.forEach(({ id }) => {
            const form = document.getElementById(id);
            if (form) form.reset();
        });

        updateSummary();
    }
});