
 // Spinner
 const spinner = function () {
    setTimeout(() => {
        const spinnerEl = $('#spinner');
        if (spinnerEl.length > 0) {
            spinnerEl.removeClass('show');
        }
    }, 1);
};
spinner();
document.addEventListener('DOMContentLoaded', function() {
    // Payment tab switching
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const tabContents = document.querySelectorAll('.payment-tab-content');

    paymentTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            paymentTabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
            
            // Update payment method in summary
            updateSummaryMethod(this.textContent.trim());
        });
    });

    // Donation amount selection
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('customAmount');
    
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            amountOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            this.classList.add('active');
            
            // Clear custom amount input
            customAmountInput.value = '';
            
            // Update summary with selected amount
            updateSummaryAmount(this.getAttribute('data-amount'));
        });
    });
    
    // Custom amount input
    customAmountInput.addEventListener('input', function() {
        // Remove active class from all amount options
        amountOptions.forEach(opt => opt.classList.remove('active'));
        
        // Update summary with custom amount
        if (this.value) {
            updateSummaryAmount(this.value);
        }
    });

    // Donation type selection
    const donationTypeSelect = document.getElementById('donationType');
    const otherSpecifyContainer = document.getElementById('otherSpecifyContainer');
    const otherSpecifyInput = document.getElementById('otherSpecify');
    
    donationTypeSelect.addEventListener('change', function() {
        if (this.value === 'other') {
            otherSpecifyContainer.style.display = 'block';
            updateSummaryType(otherSpecifyInput.value || 'Other');
        } else {
            otherSpecifyContainer.style.display = 'none';
            updateSummaryType(this.options[this.selectedIndex].text);
        }
    });
    
    otherSpecifyInput.addEventListener('input', function() {
        if (donationTypeSelect.value === 'other') {
            updateSummaryType(this.value || 'Other');
        }
    });

    // Card type selection and icons
    const cardTypeSelect = document.getElementById('cardType');
    const visaIcon = document.getElementById('visaIcon');
    const masterCardIcon = document.getElementById('masterCardIcon');
    
    cardTypeSelect.addEventListener('change', function() {
        visaIcon.style.display = 'none';
        masterCardIcon.style.display = 'none';
        
        if (this.value === 'visa') {
            visaIcon.style.display = 'inline-block';
        } else if (this.value === 'mastercard') {
            masterCardIcon.style.display = 'inline-block';
        }
    });

    // Form submissions
    const forms = [
        document.getElementById('creditCardForm'),
        document.getElementById('orangeMoneyForm'),
        document.getElementById('afrimoneyForm'),
        document.getElementById('paypalForm'),
        document.getElementById('binanceForm'),
        document.getElementById('bankTransferForm')
    ];
    
    forms.forEach(form => {
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                showStatusMessage('Thank you for your donation! Your payment is being processed.', 'success');
                
                // Reset forms after submission (for demo purposes)
                setTimeout(() => {
                    this.reset();
                    document.querySelector('.amount-option.active')?.classList.remove('active');
                    customAmountInput.value = '';
                    updateSummaryAmount('0.00');
                }, 3000);
            });
        }
    });

    // Card number formatting
    const cardNumberInput = document.getElementById('cardNumber');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\s+/g, ''); // Remove all spaces
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' '); // Add space every 4 digits
            }
            this.value = value;
        });
    }

    // Expiry date formatting
    const expiryInput = document.getElementById('cardExpiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = this.value.replace(/\//g, ''); // Remove all slashes
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4); // Add slash after 2 digits
            }
            this.value = value;
        });
    }

    // Phone number formatting for mobile money
    const phoneInputs = [document.getElementById('omNumber'), document.getElementById('afriNumber')];
    phoneInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function(e) {
                let value = this.value.replace(/\D/g, ''); // Remove all non-digit characters
                if (value.length > 0) {
                    // Format as +232 XX XXX XXXX
                    let formatted = '+232 ';
                    if (value.length > 3) {
                        formatted += value.substring(3, 5) + ' ';
                        if (value.length > 5) {
                            formatted += value.substring(5, 8) + ' ';
                            if (value.length > 8) {
                                formatted += value.substring(8, 12);
                            } else {
                                formatted += value.substring(8);
                            }
                        } else {
                            formatted += value.substring(5);
                        }
                    } else {
                        formatted += value.substring(3);
                    }
                    this.value = formatted;
                }
            });
        }
    });

    // Responsive adjustments
    function handleResponsive() {
        const donationContainer = document.querySelector('.donation-container');
        if (window.innerWidth < 992) {
            // Mobile view
            if (donationContainer) {
                donationContainer.classList.add('stacked');
            }
        } else {
            // Desktop view
            if (donationContainer) {
                donationContainer.classList.remove('stacked');
            }
        }
    }

    // Initial call and event listener for resize
    handleResponsive();
    window.addEventListener('resize', handleResponsive);

    // Helper functions
    function updateSummaryAmount(amount) {
        const summaryAmount = document.getElementById('summaryAmount');
        const summaryTotal = document.getElementById('summaryTotal');
        
        if (summaryAmount && summaryTotal) {
            const formattedAmount = parseFloat(amount).toFixed(2);
            summaryAmount.textContent = `$${formattedAmount}`;
            summaryTotal.textContent = `$${formattedAmount}`;
        }
    }

    function updateSummaryMethod(method) {
        const summaryMethod = document.getElementById('summaryMethod');
        if (summaryMethod) {
            // Clean up method text (remove logos/icons)
            const cleanMethod = method.replace(/<i[^>]*>.*?<\/i>|<img[^>]*>/g, '').trim();
            summaryMethod.textContent = cleanMethod;
        }
    }

    function updateSummaryType(type) {
        const summaryType = document.getElementById('summaryType');
        if (summaryType) {
            summaryType.textContent = type;
        }
    }

    function showStatusMessage(message, type) {
        const statusMessage = document.getElementById('statusMessage');
        if (statusMessage) {
            statusMessage.textContent = message;
            statusMessage.className = 'status-message'; // Reset class
            statusMessage.classList.add(type);
            
            // Hide after 5 seconds
            setTimeout(() => {
                statusMessage.textContent = '';
                statusMessage.className = 'status-message';
            }, 5000);
        }
    }

    // Google Translate
    function googleTranslateElementInit() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,de,pt,ar,zh-CN,ru',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');
    }

    // Set last modified date
    const lastModified = document.getElementById('lastModified');
    if (lastModified) {
        lastModified.textContent = new Date(document.lastModified).toLocaleDateString();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const languageSelect = document.getElementById('languageSelect');

    languageSelect.addEventListener('change', function () {
        const selectedLanguage = this.value;

        // Load Google Translate for the selected language
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,fr,es,de,zh-CN,ar,ru',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE
        }, 'google_translate_element');

        // Simulate language change (optional)
        alert(`Language changed to: ${selectedLanguage}`);
    });
});



function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en', // Default language (English)
        includedLanguages: 'en,fr,es,ar,zh-CN,ru,ko,hi,kri', // 8 major languages + Krio
        // Supported languages:
        // en - English
        // fr - French (important for West Africa)
        // es - Spanish (globally important)
        // ar - Arabic (important for Islamic communities)
        // zh-CN - Chinese (Mandarin)
        // ru - Russian
        // ko - Korean
        // hi - Hindi (primary language of India)
        // kri - Krio (not actually supported by Google - placeholder)
        layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
}