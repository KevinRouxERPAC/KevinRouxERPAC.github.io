document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu burger
    const nav = document.querySelector('nav');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-toggle');
    menuButton.setAttribute('aria-label', 'Menu principal');
    menuButton.innerHTML = '<span></span><span></span><span></span>';
    
    nav.querySelector('div').appendChild(menuButton);

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('active');
    });

    // Gestion des sous-menus sur mobile
    const subMenuLinks = document.querySelectorAll('nav ul > li > a:not(:only-child)');
    
    subMenuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.classList.toggle('active');
                const subMenu = this.nextElementSibling;
                subMenu.classList.toggle('show');
            }
        });
    });
}); 