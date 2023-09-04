window.addEventListener('load', () => {
    const camera = document.querySelector('[camera]');
    const marker = document.querySelector('a-marker');
    const cara = document.querySelector('#cara');
    let check;
  
    marker.addEventListener('markerFound', () => {
     
      let cameraPosition = camera.object3D.position;
      let markerPosition = marker.object3D.position;
      let distance = cameraPosition.distanceTo(markerPosition)
  
      check = setInterval(() => {
        cameraPosition = camera.object3D.position;
        markerPosition = marker.object3D.position;
        distance = cameraPosition.distanceTo(markerPosition)
        
        actualizarCara(distance);
        
      }, 100);
    });
  
    marker.addEventListener('markerLost', () => {
      clearInterval(check);
      cara.style.width=0;
    })
  })
  function actualizarCara(distancia){
  
  if(parseFloat(distancia)<=7){
    tam = 100-(parseFloat(distancia) * 100 )/ 7   ;
    console.log(tam + "%")
    cara.style.width = tam + "%";
  
  }else{
    cara.style.width = "0%";
    
  }
  }
  
  
  
    
  