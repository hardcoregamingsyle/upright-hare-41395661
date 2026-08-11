// Technoblade Tribute - Simple interactions
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for any anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Add subtle parallax effect to hero
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.transform = 'translateY(' + (scrolled * 0.3) + 'px)';
        });
    }

    // Console easter egg
    console.log('%c Technoblade Never Dies ', 'background: #7f1d1d; color: #fbbf24; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c The Blood God lives on in our hearts ', 'color: #9ca3af; font-size: 14px;');
});
