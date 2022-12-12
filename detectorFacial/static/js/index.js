


function loadImage(url) {
    let image = document.querySelector(".selectImageFile .containerImage .cimageBody .contenedorImagen .muestraImagen img");
    if(image != null){
        image.src = url;
    }
}

function showImageUrl(url) {
    let imageUrlText = document.querySelector(".selectImageFile .containerImage .cimageFooter .contenedorBotones .muestraUrl .ajusteUrl text");
    if(imageUrlText != null){
        imageUrlText.textContent = url;
    }
}

function downloadImage(url,name) {
    if(url != ""){
        var a = document.createElement('a');
        a.download = name;
        a.href= url;
        a.click();
    }
}

function lectorImage(){
    let selected = document.querySelector(".selectImageFile .containerImage .cimageFooter .contenedorInput .muestraInput input");
    let downloadBoton = document.querySelector(".selectImageFile .containerImage .cimageFooter .contenedorBotones .espacioBoton .descargar .contIcon");

    selected.addEventListener("change", () => {
        const archivos = selected.files;
        if (!archivos || !archivos.length) {
          return;
        }
        const primerArchivo = archivos[0];
        const objectURL = URL.createObjectURL(primerArchivo);
        loadImage(objectURL);
        showImageUrl(archivos[0].name);
        if (parseInt(selected.files.length)>1){ 
             
        }
        else{
            downloadBoton.addEventListener("click", () =>{
                downloadImage(objectURL,archivos[0].indexOf().name);
            })
        }
        
    });
}

lectorImage();












var imagenCont = document.querySelector(".selectImageFile .containerImage .cimageBody .contenedorImagen .muestraImagen img");
var preview = document.querySelector('.selectImageFile .containerImage .cimageBody .contenedorImagen .muestraImagen canvas');
var context = preview.getContext('2d');// Maneja el archivo seleccionado
function manejaArchivo(files) {  
  for (file of files) {
    if (file.type.match(/image\/*/)) {
      let reader = new FileReader();
      reader.onload = function(e) {
        let image = new Image();
        image.onload = function() {
            var x = ( preview.width - (imagenCont.width/2) ) /2;
            var y = ( preview.height - (imagenCont.height/2) ) /2;
            var w = imagenCont.width/2;
            var h = imagenCont.height/2;
            context.drawImage(image, x, y ,w, h );
            detectaRostros(image);
        }
        image.src = e.target.result;
      }
      reader.readAsDataURL(file);
    } 
  }
}

// Detecta rostros y los landmarks en él
function detectaRostros(image) {
    import FaceDetector
    let faceDetector = new FaceDetector({fastMode: false});
    faceDetector.detect(image).then(function(rostros) {
        rostros.forEach(function(rostro){
            dibujaCaracteristicas(rostro);
        });
    });
}// Dibuja las caracteristicas en el canvas

function dibujaCaracteristicas(caracteristicas) {
  context.fillStyle = 'cyan';
  context.strokeStyle = 'cyan';
  context.rect(
    caracteristicas.boundingBox.x, 
    caracteristicas.boundingBox.y, 
    caracteristicas.boundingBox.width, 
    caracteristicas.boundingBox.height
  );
  context.fillText('rostro', caracteristicas.boundingBox.x, caracteristicas.boundingBox.y - 5);
  context.stroke();
  caracteristicas.landmarks.forEach(function(caracteristica){
    let tipo = '';
    switch(caracteristica.type) {
      case 'eye': tipo = 'ojo'; break;
      case 'mouth': tipo = 'boca'; break;
      case 'nose': tipo = 'nariz'; break;
    }
    
    context.fillText(tipo, caracteristica.location.x + 5, caracteristica.location.y + 5);
    context.beginPath();
    context.arc(caracteristica.location.x, caracteristica.location.y, 3, 0, Math.PI * 2, true);
    context.fill();
  });
}




















