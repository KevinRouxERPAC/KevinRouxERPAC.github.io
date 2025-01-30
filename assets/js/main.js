// Déplacer ici le contenu de votre script.js 

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navContent = document.querySelector('.nav-content');

    menuToggle.addEventListener('click', function() {
        navContent.classList.toggle('active');
    });

    // Fermer le menu quand on clique en dehors
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && navContent.classList.contains('active')) {
            navContent.classList.remove('active');
        }
    });

    // Gestion du menu sur desktop
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            if (window.innerWidth > 768) {
                this.querySelector('ul').style.display = 'block';
            }
        });

        section.addEventListener('mouseleave', function() {
            if (window.innerWidth > 768) {
                this.querySelector('ul').style.display = 'none';
            }
        });
    });
}); 