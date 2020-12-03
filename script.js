
/* Mario Hernández Yañez - maheya@gmail.com*/


const imageContainer =  document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 10;
const apiKey = 'UPEmRbrBYLNbpQ6fOaGhKSYESxBrvOdq7lW-1PS9onQ'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Checar si todas las imágenes fueron cargadas
function imageLoaded(){
    imagesLoaded++;
    console.log('Image loaded')
    if(imagesLoaded === totalImages){
        ready = true;
        console.log('ready=', ready)
    }
}


// Función para crear los elementos y agregarlos al DOM
function displayFotos() {
imagesLoaded = 0;
totalImages = photosArray.length;
console.log('total images = ', totalImages)

photosArray.forEach((photo) =>{

// se crean los elementos <a>
const item = document.createElement('a');
item.setAttribute('href', photo.links.html);
item.setAttribute('target', '_blank');

// Creamos el elemnto img
const img = document.createElement('img');
img.setAttribute('src', photo.urls.regular);
img.setAttribute('alt', photo.alt_description);
img.setAttribute('title', photo.alt_description);

// Checar cuando cada carga es finalizada
img.addEventListener('load', imageLoaded);

// Ahora metemos <img> dentro de <a>, y entonces ambos dentro de imageContainer
item.appendChild(img);
imageContainer.appendChild(item);

});
}


async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayFotos();
    } catch (error) {
        alert('Algo salió mal.....');
    }
}


// Si el scroll se acerca al final de la página, entonces cargar más fotos
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});



// Carga de la función principal
getPhotos();