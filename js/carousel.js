document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.partners-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const partners = document.querySelectorAll('.partner');
    
    if (!track || !prevButton || !nextButton || partners.length === 0) return;

    // Calculer la largeur totale du carousel
    const partnerWidth = partners[0].offsetWidth;
    const gap = 30; // Espace entre les partenaires
    let position = 0;
    
    // Dupliquer les partenaires pour un défilement infini
    // partners.forEach(partner => {
    //     const clone = partner.cloneNode(true);
    //     track.appendChild(clone);
    // });

    // Fonction pour déplacer le carousel
    function moveCarousel(direction) {
        const moveAmount = partnerWidth + gap;
        const maxPosition = -(partners.length * moveAmount);
        
        if (direction === 'next') {
            position -= moveAmount;
            // Si on atteint la fin, revenir au début
            if (position < maxPosition) {
                position = 0;
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                track.offsetHeight; // Forcer un reflow
                track.style.transition = 'transform 0.5s ease';
            }
        } else {
            position += moveAmount;
            // Si on est au début, aller à la fin
            if (position > 0) {
                position = maxPosition + moveAmount;
                track.style.transition = 'none';
                track.style.transform = `translateX(${position}px)`;
                track.offsetHeight; // Forcer un reflow
                track.style.transition = 'transform 0.5s ease';
            }
        }
        
        track.style.transform = `translateX(${position}px)`;
    }

    // Gestionnaires d'événements pour les boutons
    prevButton.addEventListener('click', () => moveCarousel('prev'));
    nextButton.addEventListener('click', () => moveCarousel('next'));
}); 