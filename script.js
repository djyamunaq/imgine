const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = 'aBIv8dyXjsJ8nHygi6xkOo1S3BgmuISuc_7Uf8m50iU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosLoaded = true;
let countImagesLoaded = 0;

// Set attributes to elements
function setAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Check if images were loaded
function imageLoaded() {
    if(countImagesLoaded >= count){
        photosLoaded = true;
        countImageLoaded = 0;
    }
}

// Create elements to display links & photos
function displayPhotos() {
    photosArray.forEach((photo) => {
        // Create <a> to link Unsplash image
        const item = document.createElement('a');
        setAttributes(item, {
            'href': photo.links.html,
            'target': '_blank'
        });
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        let alt = 'Unsplash Image';
        let title = 'Unsplash Image';
        if(photo.alt_description != null) {
            alt = photo.alt_description;
            title = photo.alt_description;
        }

        setAttributes(img, {
            'src': photo.urls.regular,
            'alt': alt,
            'title': title
        });

        countImagesLoaded++;
        console.log(countImagesLoaded);

        img.addEventListener('load', imageLoaded);

        // Put <img> inside <a>, then put both inside img-container
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

// Get photos from Unsplash API
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error) {
        // Catch error
    }
}

window.addEventListener('scroll', () => {
    if(photosLoaded && window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        photosLoaded = false;
        getPhotos();
    }
});

// On Load
getPhotos();