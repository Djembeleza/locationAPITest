document.addEventListener("DOMContentLoaded", () => {

    let map = L.map("map").setView([0,0], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map);

    // Marker to represent the device's current position
    let marker = L.marker([0,0]).addTo(map);

    let path = L.polyline([], {color: 'blue'}).addTo(map);

    function updateLocation() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lng = position.coords.longitude;

                // Update the marker position
                marker.setLatLng([lat, lng]);

                // Add new position to path
                path.addLatLng([lat, lng]);

                // Pan and center the map to the current position
                map.setView([lat, lng], 13);
            }, (error) => {
                console.error("Error getting location: ", error.message)
            });
        } else {
            alert("Geolocation is not supported by this browser.")
        }
        
    }


    // Update the location every 5 seconds
    setInterval(updateLocation, 5000)
    
});