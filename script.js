document.addEventListener('DOMContentLoaded', function() {
    // Configuration de l'Intersection Observer
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    // Créer l'observer pour les animations de section
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                // Déclencher les animations des enfants
                const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach((el, index) => {
                    setTimeout(() => {
                        el.classList.add('element-visible');
                    }, index * 200); // Délai progressif pour chaque élément
                });
            } else {
                entry.target.classList.remove('section-visible');
                const animatedElements = entry.target.querySelectorAll('.animate-on-scroll');
                animatedElements.forEach(el => {
                    el.classList.remove('element-visible');
                });
            }
        });
    }, observerOptions);

    // Observer toutes les sections
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('section-animate');
        sectionObserver.observe(section);
    });

    // Ajouter la classe animate-on-scroll aux éléments à animer
    document.querySelectorAll('.expertise-card, .stat-item, .contact-info, .contact-form').forEach(el => {
        el.classList.add('animate-on-scroll');
    });

    // Fonction pour vérifier si un élément est visible dans le viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Fonction pour animer les éléments quand ils deviennent visibles
    function handleScrollAnimation() {
        const elements = document.querySelectorAll('.expertise-card, .stat-item, .fade-in-section');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('is-visible');
            }
        });
    }

    // Écouteur d'événement pour le scroll
    window.addEventListener('scroll', handleScrollAnimation);
    
    // Vérification initiale
    handleScrollAnimation();

    // Animation du menu actif
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Ajout d'un offset pour tenir compte du header
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const button = contactForm.querySelector('button[type="submit"]');
            const formData = new FormData(contactForm);
            
            // Afficher le loader
            button.classList.add('loading');
            
            try {
                // Simuler l'envoi du formulaire (à remplacer par votre véritable endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Afficher le message de succès
                showFormMessage('Message envoyé avec succès !', 'success');
            } catch (error) {
                // Afficher le message d'erreur
                showFormMessage('Une erreur est survenue. Veuillez réessayer.', 'error');
            } finally {
                // Cacher le loader
                button.classList.remove('loading');
            }
        });
    }

    function showFormMessage(message, type) {
        // Supprimer l'ancien message s'il existe
        const oldMessage = contactForm.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }

        // Créer et afficher le nouveau message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        contactForm.appendChild(messageElement);

        // Faire disparaître le message après 5 secondes
        setTimeout(() => {
            messageElement.style.display = 'none';
        }, 5000);
    }

    // Gestion du clic sur les liens du menu
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const windowHeight = window.innerHeight;
                const sectionHeight = targetSection.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;

                // Si la section est plus grande que la fenêtre, on scrolle en haut
                // Sinon, on centre la section
                const scrollTo = sectionHeight > windowHeight - headerHeight
                    ? targetPosition
                    : targetPosition - (windowHeight - sectionHeight) / 2;
                
                window.scrollTo({
                    top: Math.max(0, scrollTo),
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animation des nombres dans les statistiques
    function animateNumbers() {
        document.querySelectorAll('.stat-number').forEach(stat => {
            const target = parseInt(stat.textContent);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateNumber = () => {
                current += step;
                if (current < target) {
                    stat.textContent = Math.floor(current) + '+';
                    requestAnimationFrame(updateNumber);
                } else {
                    stat.textContent = target + '+';
                }
            };

            updateNumber();
        });
    }

    // Animation des cartes d'expertise au survol
    document.querySelectorAll('.expertise-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    // Déclenchement des animations au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                if (entry.target.classList.contains('about-stats')) {
                    animateNumbers();
                }
            }
        });
    }, { threshold: 0.2 });

    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    let currentImageIndex = 0;
    const images = [];

    // Fonction pour ouvrir le modal
    function openModal(imgSrc) {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        
        // Collecter toutes les images de la galerie
        images.length = 0;
        document.querySelectorAll('.gallery-img').forEach(img => {
            images.push(img.src);
        });
        
        currentImageIndex = images.indexOf(imgSrc);
        modalImg.src = imgSrc;
        modal.style.display = 'flex';
        
        // Empêcher le défilement du body
        document.body.style.overflow = 'hidden';
    }

    // Fermer le modal
    document.querySelector('.close-modal').onclick = function() {
        document.getElementById('imageModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Navigation dans le modal
    document.querySelector('.prev-btn').onclick = function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        document.getElementById('modalImage').src = images[currentImageIndex];
    }

    document.querySelector('.next-btn').onclick = function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        document.getElementById('modalImage').src = images[currentImageIndex];
    }

    // Fermer avec la touche Echap
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.getElementById('imageModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Gestion des filtres de la galerie
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', () => {
            // Mise à jour des boutons actifs
            document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.dataset.category;
            filterGallery(category);
        });
    });

    function filterGallery(category) {
        const items = document.querySelectorAll('.gallery-item');
        
        items.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.classList.remove('hidden');
                setTimeout(() => {
                    item.style.opacity = '1';
                }, 0);
            } else {
                item.style.opacity = '0';
                setTimeout(() => {
                    item.classList.add('hidden');
                }, 300);
            }
        });
    }

    // Menu hamburger
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animation du menu hamburger
        const spans = this.getElementsByTagName('span');
        this.classList.toggle('active');
        
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fermer le menu lors du clic sur un lien
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
            const spans = menuToggle.getElementsByTagName('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

        // Gestion des sous-menus sur mobile
        const menuItems = document.querySelectorAll('.menu-item-has-children');
    
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    if (e.target.tagName === 'A' && e.target.parentElement.classList.contains('menu-item-has-children')) {
                        e.preventDefault();
                        this.classList.toggle('active');
                    }
                }
            });
        });
    
        // Fermer les sous-menus lors du redimensionnement
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                menuItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
}); 