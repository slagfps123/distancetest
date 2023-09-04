let markerBvisible = false;
let markerAvisible = false;
let markerGokuvisible = false;
let markerNewvisible = false;

//AFRAME.registerComponent('videohandler', {
//    init: function () {
//        var marker = this.el;
//        this.vid = document.querySelector("#vid");
//
//        marker.addEventListener('markerFound', function () {
//            this.toggle = true;
//            this.vid.play();
//        }.bind(this));
//
//        marker.addEventListener('markerLost', function () {
//            this.toggle = false;
//            this.vid.pause();
//            vid.currentTime = 0;
//        }.bind(this));
 //   },
//});



AFRAME.registerComponent("gokuhandler", {
    init: function () {
        const markerVideo1 = this.el;
        const objectGoku = document.getElementById("object-goku");
        const objectNewMarker = document.getElementById("object-newmarker");
        const gokuVid = document.getElementById("gokuvid");
        this.cam = document.querySelector("[camera]")
        this.goku1 = document.querySelector("#object-goku")

        // When the marker is found, the `markerFound` event is triggered
        markerVideo1.addEventListener("markerFound", (event) => {
            console.log("Marker found: Goku");
            // Perform actions when the marker is found
            markerGokuvisible = true;
            gokuVid.play();
            let camPos = this.cam.object3D.position
            let goku1pos = this.goku1.object3D.position
            let distance = camPos.distanceTo(goku1pos)
            document.getElementById("distancetext").innerHTML=distance;
            console.log("Distance from Camera to Marker is " + distance);
        });
        // When the marker is lost, the `markerLost` event is triggered
        markerVideo1.addEventListener("markerLost", (event) => {
            console.log("Marker lost: Goku");
            markerGokuvisible = false;
            //                this.vid.pause();
            //                vid.currentTime = 0;
            gokuVid.pause();
            gokuVid.currentTime=0;
            
        });
      
    },
    //tick: function () {
        //let camPos = this.cam.object3D.position
        //let goku1pos = this.goku1.object3D.position
        //let distance = camPos.distanceTo(goku1pos)
        //document.getElementById("distancetext").innerHTML=distance;
        //console.log("Distance from Camera to Marker is " + distance);
        // if (distance < 5) {
        // camera closer than 5m, do something
           // document.getElementById("distancetext").innerHTML=distance;
            //console.log("Distance from Camera to Marker is " + distance);
        // }}
    //}
});

AFRAME.registerComponent("newmarkerhandler", {
    init: function () {
        const markerVideo2 = this.el;
        const objectGoku = document.getElementById("object-goku");
        const objectNewMarker = document.getElementById("object-newmarker");
        const newVid = document.getElementById("newvid");
        // When the marker is found, the `markerFound` event is triggered
        markerVideo2.addEventListener("markerFound", (event) => {
            console.log("Marker found: New Mark");
            // Perform actions when the marker is found
            markerNewvisible = true;
            newVid.play();
        });
        // When the marker is lost, the `markerLost` event is triggered
        markerVideo2.addEventListener("markerLost", (event) => {
            console.log("Marker lost: New Mark");
            markerNewvisible = false;
            newVid.pause();
            newVid.currentTime=0;
            
        });
    }
});

AFRAME.registerComponent("marker-b", {
    init: function () {
        const markerB = this.el;
        const objectA = document.getElementById("object-a");
        const objectB = document.getElementById("object-b");
        // When the marker is found, the `markerFound` event is triggered
        markerB.addEventListener("markerFound", (event) => {
            console.log("Marker found: B");
            // Perform actions when the marker is found
            markerBvisible = true;

            objectB.setAttribute("animation-mixer", "clip: Pop Up; loop: once; duration: 0; crossFadeDuration: 1");
            objectB.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
            objectB.setAttribute("look-at", "[camera]");

            if (markerAvisible == true) {
                objectA.setAttribute("gltf-model", "/assets/talk.glb");
                objectA.setAttribute("look-at", "[object-b]");
                objectA.setAttribute("scale", "0.1 0.1 0.1");
                objectA.setAttribute("animation", "property:scale; from:0 0 0; to:0.1 0.1 0.1; dur:1000; easing: easeInOutSine; dir: alternate; loop: false");
                // objectB.setAttribute("animation-mixer", "clip: Pop Up; loop: once; duration: 0; crossFadeDuration: 1");
                objectB.setAttribute("animation-mixer", "clip: Talk; loop: repeat; duration: 0; crossFadeDuration: 1");
                objectB.setAttribute("look-at", "[object-a]");
            } else {
                objectA.removeAttribute("gltf-model");
                objectA.removeAttribute("look-at");
                objectA.removeAttribute("scale");
                objectA.removeAttribute("animation");
                objectB.setAttribute("animation-mixer", "clip: Idle; loop: repeat; duration: 0; crossFadeDuration: 1");
                objectB.setAttribute("look-at", "[camera]");
            }

        });
        // When the marker is lost, the `markerLost` event is triggered
        markerB.addEventListener("markerLost", (event) => {
            console.log("Marker lost: B");
            // Perform actions when the marker is lost
            markerBvisible = false;
            objectA.setAttribute("look-at", "[camera]");
            objectA.setAttribute("gltf-model", "/assets/jump.glb");
            objectA.setAttribute("scale", "0.3 0.3 0.3");
            objectB.removeAttribute("animation-mixer");
        });

        //else if (markerBvisible == true) {
        //     objectA.setAttribute("gltf-model", "/assets/talk.glb");
        //     objectA.setAttribute("look-at", "[marker-b]");
        // }
    }
});

AFRAME.registerComponent("marker-a", {
    init: function () {
        const markerA = this.el;
        const objectB = document.getElementById("object-b");
        const objectA = document.getElementById("object-a");
        // When the marker is found, the `markerFound` event is triggered
        markerA.addEventListener("markerFound", (event) => {
            console.log("Marker found: A");
            // Perform actions when the marker is found
            markerAvisible = true;
            let objectAmodelValue = objectA.getAttribute("gltf-model");

            objectA.setAttribute("gltf-model", "/assets/jump.glb");



            if (objectAmodelValue == "/assets/talk.glb") {
                objectA.setAttribute("animation", "property:scale; from:0 0 0; to:0.1 0.1 0.1; dur:1000; easing: easeInOutSine; dir: alternate; loop: false");
            } else {
                objectA.setAttribute("animation", "property:scale; from:0 0 0; to:0.3 0.3 0.3; dur:1000; easing: easeInOutSine; dir: alternate; loop: false");
            }


            if (markerBvisible == true) {
                objectB.setAttribute("animation-mixer", "clip: Talk");
                objectB.setAttribute("look-at", "[object-a]");
                objectA.setAttribute("gltf-model", "/assets/talk.glb");
                objectA.setAttribute("scale", "0.1 0.1 0.1");
                objectA.setAttribute("look-at", "[object-b]");
            } else {
                objectB.removeAttribute("animation-mixer");
                objectB.removeAttribute("look-at");
                objectA.setAttribute("gltf-model", "/assets/jump.glb");
                objectA.setAttribute("scale", "0.3 0.3 0.3");
                objectA.setAttribute("look-at", "[camera]");
            }

        });

        if (markerAvisible == true) {
            let objectAmodelValue = objectA.getAttribute("gltf-model");
            if (objectAmodelValue == "/assets/talk.glb") {
                objectA.setAttribute("animation", "property:scale; from:0 0 0; to:0.1 0.1 0.1; dur:1000; easing: easeInOutSine; dir: alternate; loop: false");
            } else {

            }
        }

        // When the marker is lost, the `markerLost` event is triggered
        markerA.addEventListener("markerLost", (event) => {
            console.log("Marker lost: A");
            // Perform actions when the marker is lost
            markerAvisible = false;
            objectB.setAttribute("look-at", "[camera]");
            objectB.setAttribute("animation-mixer", "clip: Idle");
            // objectB.setAttribute("animation", "property:rotation; dur:1000; easing: easeInOutSine; dir: alternate;");
            // objectB.setAttribute("gltf-model", "/assets/Stuff_octopus.glb");
            objectA.removeAttribute("gltf-model");
            objectA.removeAttribute("animation");
            objectA.removeAttribute("scale");
        });
    }
});

AFRAME.registerComponent('cloak', {
    init: function () {
        var geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        //   var material = new THREE.MeshBasicMaterial( {colorWrite: false} );
        var material = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
        var cube = new THREE.Mesh(geometry, material);
        this.el.object3D.add(cube);
    }
})
