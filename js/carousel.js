document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.partners-track');
    const prevButton = document.querySelector('.carousel-arrow.prev');
    const nextButton = document.querySelector('.carousel-arrow.next');
    const partners = Array.from(document.querySelectorAll('.partner'));
    
    if (!track || !prevButton || !nextButton || partners.length === 0) return;

    const partnerWidth = partners[0].offsetWidth;
    const gap = 30;
    let currentIndex = partners.length;
    let isTransitioning = false;

    // Nettoyer le track avant duplication
    track.innerHTML = '';

    // Dupliquer les partenaires pour un effet infini
    const clonesBefore = partners.map(p => p.cloneNode(true));
    const clonesAfter = partners.map(p => p.cloneNode(true));
    clonesBefore.forEach(clone => track.appendChild(clone));
    partners.forEach(partner => track.appendChild(partner));
    clonesAfter.forEach(clone => track.appendChild(clone));

    // Ajuster la largeur du track
    track.style.width = `${(partners.length * 3) * (partnerWidth + gap)}px`;
    track.style.display = 'flex';
    track.style.gap = `${gap}px`;

    // Positionner le track au centre (au début des vrais éléments)
    function setPosition(index, transition = true) {
        const pos = -(index * (partnerWidth + gap));
        track.style.transition = transition ? 'transform 0.5s ease' : 'none';
        track.style.transform = `translateX(${pos}px)`;
    }
    setPosition(currentIndex, false);

    function moveCarousel(direction) {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex += direction === 'next' ? 1 : -1;
        setPosition(currentIndex, true);
    }

    track.addEventListener('transitionend', () => {
        isTransitioning = false;
        if (currentIndex >= partners.length * 2) {
            currentIndex = partners.length;
            setPosition(currentIndex, false);
        }
        if (currentIndex < partners.length) {
            currentIndex = partners.length * 2 - 1;
            setPosition(currentIndex, false);
        }
    });

    prevButton.addEventListener('click', () => moveCarousel('prev'));
    nextButton.addEventListener('click', () => moveCarousel('next'));
});
