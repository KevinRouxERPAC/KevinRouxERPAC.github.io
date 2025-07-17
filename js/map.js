var map = L.map('map').setView([46.551894732692695, 2.439499449922733], 6);

const message = document.createElement('div');
message.textContent = 'Maintenez Ctrl pour zoomer';
message.id = 'zoom-message';
map.getContainer().appendChild(message);

map.scrollWheelZoom.disable();

map.getContainer().addEventListener('wheel', function(e) {
    if (e.ctrlKey) {
        message.style.display = 'none'; // Hide the message when zooming
        e.preventDefault();
        var zoom = map.getZoom();
        if (e.deltaY < 0) {
            map.setZoom(zoom + 1);
        } else {
            map.setZoom(zoom - 1);
        }
    } else {
        message.style.display = 'block'; // Show the message when not zooming
    }
}, {passive: false});
    
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; OpenStreetMap contributors'}).addTo(map);

L.marker([46.94576575551033, 2.9562034680787654]).addTo(map)
    .bindPopup("<div style='display: flex; align-items: center; gap: 10px;'><img src='images/logos/logo_seul.png' alt='ERPAC' style='width: 20px; height: 20px;'><b>ERPAC</b></div>")
    .openPopup();
