document.addEventListener('DOMContentLoaded', () => {
    console.log('Hlekokuhe Laundry website loaded successfully');

    const navbar = document.querySelector('.glassy-navbar');
    const bubbleContainer = document.getElementById('bubbleContainer');
    let lastScrollY = window.scrollY;
    let bubbleCooldown = false;
    let isProgrammaticScroll = false; // For anchor link scrolling

    /* =========================
       NAVBAR & BUBBLE SCROLL HANDLER
       ========================= */
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Navbar scroll effect
        if (navbar) {
            navbar.classList.toggle('scrolled', currentScrollY > 50);
        }
        
        // Create bubbles ONLY when scrolling DOWN past hero
        if (bubbleContainer && currentScrollY > 600 && currentScrollY > lastScrollY && !bubbleCooldown) {
            bubbleCooldown = true;
            
            if (Math.random() < 0.35) {
                createFoamBubble();
            }
            
            setTimeout(() => {
                bubbleCooldown = false;
            }, 300);
        }
        
        lastScrollY = currentScrollY;
    }, { passive: true });

    /* =========================
       BUBBLE CREATOR (SIMPLIFIED)
       ========================= */
    function createFoamBubble() {
        if (!bubbleContainer) return;
        
        const bubble = document.createElement('div');
        const size = Math.random() * 42 + 18;
        const duration = Math.random() * 8 + 12;
        const left = Math.random() * 100;
        
        bubble.className = 'foam-bubble';
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.bottom = '0';
        bubble.style.animationDuration = `${duration}s`;
        
        bubbleContainer.appendChild(bubble);
        
        // Fade in
        requestAnimationFrame(() => {
            bubble.style.opacity = '1';
        });
        
        // Auto-remove after animation
        setTimeout(() => {
            if (bubble.parentNode) bubble.remove();
        }, duration * 1000);
    }

    /* =========================
       SMOOTH SCROLL FOR ANCHOR LINKS (MOBILE SAFE)
       ========================= */
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (!target) return;
            
            e.preventDefault();
            isProgrammaticScroll = true;
            
            // Calculate position (account for fixed navbar)
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            // Smooth scroll
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Reset flag after scroll completes
            setTimeout(() => {
                isProgrammaticScroll = false;
            }, 800);
            
            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse && window.bootstrap?.Collapse) {
                bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            }
        });
    });

    /* =========================
       SWIPER INIT (SAFE)
       ========================= */
    if (window.Swiper && document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
        });
    }
});
