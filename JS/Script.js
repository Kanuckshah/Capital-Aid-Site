// Wait for both DOM content AND nav.html to load
document.addEventListener('DOMContentLoaded', function() {
    // First, wait for the nav to be inserted
    const checkNavLoaded = setInterval(function() {
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            clearInterval(checkNavLoaded);
            initMobileMenu();
            initOtherFeatures();
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
});