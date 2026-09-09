// Wait for both DOM content AND nav.html to load
document.addEventListener('DOMContentLoaded', function() {
    // First, wait for the nav to be inserted
    const checkNavLoaded = setInterval(function() {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            clearInterval(checkNavLoaded);
            initMobileMenu();
            initOtherFeatures();
            initFairCountdown();
            initPipVideoWidget();
        }
    }, 100);

    function initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const mobileMenu = document.querySelector('.mobile-menu');
        const overlay = document.querySelector('.overlay');
        const closeBtn = document.querySelector('.close-btn');

        function toggleMenu() {
            mobileMenu.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        }

        if (hamburger && mobileMenu && overlay && closeBtn) {
            hamburger.addEventListener('click', toggleMenu);
            closeBtn.addEventListener('click', toggleMenu);
            overlay.addEventListener('click', toggleMenu);

            // Close menu when clicking any mobile link
            const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-social a, .signup-btn-mobile');
            mobileLinks.forEach(link => {
                link.addEventListener('click', toggleMenu);
            });
            
            console.log('Mobile menu initialized successfully');
        } else {
            console.error('Mobile menu elements not found');
        }
    }

    function initOtherFeatures() {
        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Button hover effects
        const buttons = document.querySelectorAll('.ca-btn');
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                button.style.transform = 'translateY(-3px) scale(1.05)';
            });
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Tab switching (if exists on page)
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
                document.querySelectorAll('.form-embed').forEach(embed => embed.classList.remove('active'));
                button.classList.add('active');
                const tabName = button.getAttribute('data-tab');
                const embed = document.getElementById(`${tabName}-embed`);
                if (embed) embed.classList.add('active');
            });
        });
    }

    // Community Fair Countdown Timer (Sept 19, 2026 @ 1:00 PM EST)
    function initFairCountdown() {
        const cdDays = document.getElementById('cd-days');
        const cdHours = document.getElementById('cd-hours');
        const cdMins = document.getElementById('cd-mins');
        const cdSecs = document.getElementById('cd-secs');

        if (!cdDays || !cdHours || !cdMins || !cdSecs) return;

        const eventDate = new Date('September 19, 2026 11:00:00 EST').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance < 0) {
                cdDays.innerText = '00';
                cdHours.innerText = '00';
                cdMins.innerText = '00';
                cdSecs.innerText = '00';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            cdDays.innerText = String(days).padStart(2, '0');
            cdHours.innerText = String(hours).padStart(2, '0');
            cdMins.innerText = String(minutes).padStart(2, '0');
            cdSecs.innerText = String(seconds).padStart(2, '0');
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // Floating Picture-in-Picture Corner Video Controls
    function initPipVideoWidget() {
        const widget = document.getElementById('pipVideoWidget');
        const minimizeBtn = document.getElementById('pipMinimizeBtn');
        const closeBtn = document.getElementById('pipCloseBtn');

        if (!widget || !minimizeBtn || !closeBtn) return;

        // Check if user previously closed it in this session
        if (sessionStorage.getItem('pipWidgetClosed') === 'true') {
            widget.classList.add('hidden');
        }

        minimizeBtn.addEventListener('click', function() {
            widget.classList.toggle('minimized');
            const icon = minimizeBtn.querySelector('i');
            if (widget.classList.contains('minimized')) {
                icon.className = 'fas fa-expand';
            } else {
                icon.className = 'fas fa-minus';
            }
        });

        closeBtn.addEventListener('click', function() {
            widget.classList.add('hidden');
            sessionStorage.setItem('pipWidgetClosed', 'true');
            // Pause iframe video if playing
            const iframe = document.getElementById('pipIframe');
            if (iframe && iframe.contentWindow) {
                iframe.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
            }
        });
    }
});

// Global form submission handler for Community Fair Registration Form
function handleFairFormSubmit(event) {
    event.preventDefault();
    const form = document.getElementById('communityFairForm');
    const successMsg = document.getElementById('formSuccessMessage');
    
    if (form && successMsg) {
        form.style.display = 'none';
        successMsg.style.display = 'block';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}