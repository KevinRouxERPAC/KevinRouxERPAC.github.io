// Initialisation sécurisée de la carte
try {
    const currentPath = window.location.pathname;
    const isInSubfolder = currentPath.includes('/services/') || currentPath.includes('/entreprise/') || currentPath.includes('/legal/');
    const basePath = isInSubfolder ? '../' : '';
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    if (typeof L === 'undefined') {
        throw new Error('Leaflet not loaded');
    }

    const mapElement = document.getElementById('map');
    if (!mapElement) {
        throw new Error('Map element not found');
    }

    mapElement.innerHTML = '';

    var map = L.map('map').setView([46.94576575551033, 2.9562034680787654], 14);

    if (!isTouch) {
        const message = document.createElement('div');
        message.textContent = 'Maintenez Ctrl + molette pour zoomer';
        message.id = 'zoom-message';
        message.style.cssText = `
            position: absolute;
            top: 10px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(55, 55, 55, 0.9);
            color: white;
            padding: 8px 12px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 1000;
            pointer-events: none;
            transition: opacity 0.3s ease;
        `;
        map.getContainer().appendChild(message);

        map.scrollWheelZoom.disable();

        map.getContainer().addEventListener('wheel', function(e) {
            if (e.ctrlKey || e.metaKey) {
                e.preventDefault();
                message.style.opacity = '0';
                var zoom = map.getZoom();
                if (e.deltaY < 0) {
                    map.setZoom(Math.min(zoom + 1, 18));
                } else {
                    map.setZoom(Math.max(zoom - 1, 1));
                }
            } else {
                message.style.opacity = '1';
            }
        }, { passive: false });
    }

    const tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
        errorTileUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=='
    });

    tileLayer.on('tileerror', function(error) {
        console.warn('Tile loading error:', error);
    });

    tileLayer.addTo(map);

    const style = document.createElement('style');
    style.textContent = `
        .erpac-popup .leaflet-popup-content-wrapper {
            border-radius: 8px;
            box-shadow: 0 3px 15px rgba(0,0,0,0.2);
        }
        .erpac-popup .leaflet-popup-content {
            margin: 12px 16px;
            font-family: 'Inter', system-ui, sans-serif;
        }
        .erpac-popup .leaflet-popup-tip {
            background: white;
        }
    `;
    document.head.appendChild(style);

    L.marker([46.94576575551033, 2.9562034680787654])
        .addTo(map)
        .bindPopup(`
            <div style='display: flex; align-items: center; gap: 10px; font-family: "Inter", system-ui, sans-serif; min-width: 200px;'>
                <img src='${basePath}assets/images/logos/logo_seul.png' alt='' style='width: 30px; height: 30px; flex-shrink: 0;'>
                <div style='flex: 1;'>
                    <strong style='color: #008C3A; font-size: 16px;'>ERPAC</strong><br>
                    <small style='color: #666; line-height: 1.3;'>Électronique - Électrotechnique - Automatisme</small>
                </div>
            </div>
        `, {
            maxWidth: 280,
            className: 'erpac-popup'
        })
        .openPopup();

} catch (error) {
    console.error('Map initialization failed:', error);
    const mapElement = document.getElementById('map');
    if (mapElement) {
        mapElement.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; height: 200px; background-color: #f5f5f5; border-radius: 10px; color: #666;">
                <div style="text-align: center;">
                    <p><strong>ERPAC</strong></p>
                    <p>49bis Avenue de la République<br>18150 La Guerche-sur-l'Aubois</p>
                    <a href="https://www.google.fr/maps/place/ERPAC" target="_blank" rel="noopener noreferrer" style="color: #008C3A; text-decoration: none;">
                        Voir sur Google Maps →
                    </a>
                </div>
            </div>
        `;
    }
}
