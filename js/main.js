document.addEventListener('DOMContentLoaded', () => {
    console.log('Hlekokuhe Laundry website loaded successfully');

    const navbar = document.querySelector('.glassy-navbar');
    const bubbleContainer = document.getElementById('bubbleContainer');

    let lastScrollY = window.scrollY;
    let bubbleCooldown = false;

    /* =========================
       SCROLL HANDLER
       ========================= */
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 'down' : 'up';

        /* Navbar glass effect */
        if (navbar) {
            navbar.classList.toggle('scrolled', currentScrollY > 50);
        }

        /* Bubble creation (throttled + scroll driven) */
        if (bubbleContainer && !bubbleCooldown) {
            bubbleCooldown = true;

            if (Math.random() < 0.35) {
                createFoamBubble(direction);
            }

            setTimeout(() => {
                bubbleCooldown = false;
            }, 120);
        }

        lastScrollY = currentScrollY;
    }, { passive: true });

    /* =========================
       BUBBLE CREATOR
       ========================= */
    function createFoamBubble(direction) {
        const bubble = document.createElement('div');

        const size = Math.random() * 42 + 18;
        const duration = Math.random() * 8 + 12;
        const left = Math.random() * 100;

        const themeClass = direction === 'down' ? 'green' : 'blue';
        const motionClass = direction === 'down' ? 'up' : 'down';

        bubble.className = `foam-bubble ${themeClass} ${motionClass}`;
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${left}%`;
        bubble.style.animationDuration = `${duration}s`;

        bubbleContainer.appendChild(bubble);

        /* Force paint before animation */
        requestAnimationFrame(() => {
            bubble.style.opacity = '1';
        });

        setTimeout(() => {
            bubble.remove();
        }, duration * 1000);
    }

    /* =========================
       SWIPER (SAFE INIT)
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

    /* =========================
       SMOOTH SCROLL
       ========================= */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth',
            });

            const navbarCollapse = document.querySelector('.navbar-collapse.show');
            if (navbarCollapse && window.bootstrap) {
                bootstrap.Collapse.getInstance(navbarCollapse)?.hide();
            }
        });
    });
});
