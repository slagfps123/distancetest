document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const placeMarker = document.querySelector('a-gps-entity-place[name="place-marker"]');
    const camera = document.querySelector('a-entity[camera]');
    const distanceText = document.getElementById('distance-text');

    // Function to calculate and update the distance
    function calculateDistance() {
        const cameraPosition = camera.object3D.position;
        const placePosition = placeMarker.object3D.position;
        const distance = cameraPosition.distanceTo(placePosition).toFixed(2);

        // Update the a-text element with the distance
        distanceText.setAttribute('value', `Distance: ${distance} meters`);
    }

    // Set up a loop to continuously calculate and update distance
    let distanceInterval;
    placeMarker.addEventListener('loaded', () => {
        distanceInterval = setInterval(calculateDistance, 1000); // Adjust the interval as needed
    });

    placeMarker.addEventListener('gps-enter', () => {
        // Start calculating distance when the GPS entity is nearby
        distanceInterval = setInterval(calculateDistance, 1000); // Adjust the interval as needed
    });

    placeMarker.addEventListener('gps-exit', () => {
        clearInterval(distanceInterval);
        // Clear the distance text when the GPS entity is out of range
        distanceText.setAttribute('value', 'Distance: ');
    });
});
