document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.partners-track');
    const partners = track.querySelectorAll('.partner');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    
    let currentIndex = 0;
    
    function updateCarousel() {
        const viewportWidth = track.parentElement.offsetWidth;
        const partnerWidth = partners[0].offsetWidth;
        const gap = 48; // 3rem gap
        const partnersPerView = Math.floor(viewportWidth / (partnerWidth + gap));
        const maxIndex = partners.length - partnersPerView;
        
        // Mise à jour de la position
        const offset = (partnerWidth + gap) * currentIndex;
        track.style.transform = `translateX(-${offset}px)`;
        
        // Mise à jour des boutons
        prevButton.disabled = currentIndex <= 0;
        nextButton.disabled = currentIndex >= maxIndex;
    }

    function slide(direction) {
        const viewportWidth = track.parentElement.offsetWidth;
        const partnerWidth = partners[0].offsetWidth;
        const gap = 48; // 3rem gap
        const partnersPerView = Math.floor(viewportWidth / (partnerWidth + gap));
        const maxIndex = Math.max(0, partners.length - partnersPerView);
        
        currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
        updateCarousel();
    }

    // Gestionnaires d'événements
    prevButton.addEventListener('click', () => slide(-1));
    nextButton.addEventListener('click', () => slide(1));
    
    // Initialisation
    updateCarousel();
    
    // Mise à jour lors du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            currentIndex = 0;
            updateCarousel();
        }, 100);
    });
}); 