
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
        downloadBoton.addEventListener("click", () =>{
            downloadImage(objectURL,archivos[0].name);
        })
    });
}

lectorImage();





















