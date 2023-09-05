document.addEventListener('DOMContentLoaded', () => {
    const scene = document.querySelector('a-scene');
    const marker = document.querySelector('a-marker');
    const camera = document.querySelector('a-entity[camera]');

    // Add an event listener for when the marker is found
    marker.addEventListener('markerFound', () => {
        console.log('Marker found!');
    });

    // Add an event listener for when the marker is lost
    marker.addEventListener('markerLost', () => {
        console.log('Marker lost.');
    });

    // Function to calculate and log the distance between camera and marker
    function calculateDistance() {
        const cameraPosition = camera.object3D.position;
        const markerPosition = marker.object3D.position;
        const distance = cameraPosition.distanceTo(markerPosition);
        console.log('Distance to marker:', distance.toFixed(2), 'meters');
    }

    // Set up a loop to continuously calculate and log distance
    let distanceInterval;
    marker.addEventListener('markerFound', () => {
        distanceInterval = setInterval(calculateDistance, 1000); // Adjust the interval as needed
    });

    marker.addEventListener('markerLost', () => {
        clearInterval(distanceInterval);
    });
});
