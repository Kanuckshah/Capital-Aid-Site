document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.overlay');
    const closeBtn = document.querySelector('.close-btn');

    function openMenu() {
        mobileMenu.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeMenu() {
        mobileMenu.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = ''; // Allow scrolling again
    }

    if (hamburger && mobileMenu && closeBtn) {
        hamburger.addEventListener('click', openMenu);
        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);

        // Close menu when clicking on a mobile link
        const mobileLinks = document.querySelectorAll('.mobile-links a, .mobile-social a, .signup-btn-mobile');
        mobileLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    } else {
        console.error('One or more elements not found.');
    }
});


document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
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
  });


  // Tab Switching Functionality
document.querySelectorAll('.tab-button').forEach(button => {
  button.addEventListener('click', () => {
    // Remove active class from all buttons and embeds
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.form-embed').forEach(embed => embed.classList.remove('active'));
    
    // Add active class to clicked button
    button.classList.add('active');
    
    // Show corresponding embed
    const tabName = button.getAttribute('data-tab');
    document.getElementById(`${tabName}-embed`).classList.add('active');
  });
});