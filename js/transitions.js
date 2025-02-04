document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.page-transition');
    const menuItems = Array.from(document.querySelectorAll('nav > ul > li > a'));
    
    // Effet d'entrée lors du chargement de la page
    container.classList.add('fade-in');
    requestAnimationFrame(() => {
        container.classList.remove('fade-in');
    });
    
    // Obtenir l'index de la page actuelle dans le menu
    const getCurrentPageIndex = () => {
        const currentPath = window.location.pathname.split('/').pop() || 'index.html';
        return menuItems.findIndex(item => item.getAttribute('href') === currentPath);
    };
    
    // Gestion des liens
    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = link.getAttribute('href');
            if (href.indexOf('.html') > -1 && // Ne traiter que les liens vers les pages HTML
                link.href.indexOf(window.location.origin) === 0 && 
                link.href !== window.location.href) {
                
                e.preventDefault();
                
                const currentIndex = getCurrentPageIndex();
                const targetIndex = menuItems.findIndex(item => item.getAttribute('href') === href);
                
                // Déterminer la direction de la transition
                const direction = targetIndex > currentIndex ? 'right' : 'left';
                
                // Appliquer la classe de transition appropriée
                container.classList.add(`fade-out-to-${direction}`);
                
                setTimeout(() => {
                    window.location.href = link.href;
                }, 400);
            }
        });
    });
}); 