document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp click tracking (optional analytics)
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me"]');
    
    whatsappLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add analytics tracking here if needed
            console.log('WhatsApp chat initiated:', new Date().toISOString());
            
            // Optional: Show confirmation toast
            if (window.bootstrap && window.bootstrap.Toast) {
                const toast = new bootstrap.Toast(document.getElementById('whatsappToast'));
                if (document.getElementById('whatsappToast')) toast.show();
            }
        });
    });
    
    // Auto-hide floating button on scroll (improves UX on long pages)
    let lastScrollTop = 0;
    const whatsappFloat = document.getElementById('whatsapp-float');
    
    if (whatsappFloat) {
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 300 && scrollTop > lastScrollTop) {
                // Scrolling down - hide button
                whatsappFloat.style.transform = 'translateY(100px)';
                whatsappFloat.style.opacity = '0';
            } else {
                // Scrolling up or at top - show button
                whatsappFloat.style.transform = 'translateY(0)';
                whatsappFloat.style.opacity = '1';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Add click animation to main button
    const mainBtn = document.querySelector('.btn-whatsapp');
    if (mainBtn) {
        mainBtn.addEventListener('click', function(e) {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
});