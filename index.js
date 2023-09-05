document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const marker = document.querySelector('a-marker');
    const camera = document.querySelector('a-entity[camera]');
    const distanceText = document.getElementById('distance-text');

    // Function to calculate and update the distance
    function calculateDistance() {
        const cameraPosition = camera.object3D.position;
        const markerPosition = marker.object3D.position;
        const distance = cameraPosition.distanceTo(markerPosition).toFixed(2);

        // Update the a-text element with the distance
        distanceText.setAttribute('value', `Distance: ${distance} meters`);
    }

    // Set up a loop to continuously calculate and update distance
    let distanceInterval;
    marker.addEventListener('markerFound', () => {
        distanceInterval = setInterval(calculateDistance, 1000); // Adjust the interval as needed
    });

    marker.addEventListener('markerLost', () => {
        clearInterval(distanceInterval);
        // Clear the distance text when the marker is lost
        distanceText.setAttribute('value', 'Distance: ');
    });
});