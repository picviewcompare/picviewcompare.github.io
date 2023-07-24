const imageGrid = document.getElementById('imageGrid');
let currentImageIndex = 0; // Keep track of the current image index

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const gridItem = event.target.closest('.grid-item');
  const imageElement = gridItem.querySelector('.uploaded-image');
  const imageIndex = parseInt(imageElement.getAttribute('data-index'), 10);
  const labelElement = gridItem.querySelector('.upload-label');

  reader.onload = function(event) {
    const imageURL = event.target.result;
    imageElement.src = imageURL;

// Save the image data to localStorage
    saveImageData(imageIndex, imageURL);

// Add a class to the label element to indicate that an image has been uploaded
    labelElement.classList.add('image-has-been-uploaded');
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}


function toggleFullScreen(imageElement) {
  const gridItem = imageElement.closest('.grid-item');
  if (!gridItem.classList.contains('full-screen')) {
// Expand the image to full screen
    gridItem.classList.add('full-screen');
    document.addEventListener('keydown', handleEscapeKey);
  } else {
// Return the image to the original position in the grid
    gridItem.classList.remove('full-screen');
    document.removeEventListener('keydown', handleEscapeKey);
  }
}

function handleEscapeKey(event) {
  if (event.key === 'Escape') {
    const fullscreenImage = document.querySelector('.full-screen');
    if (fullscreenImage) {
      fullscreenImage.classList.remove('full-screen');
      document.removeEventListener('keydown', handleEscapeKey);
    }
  }
}

// Function to generate unique IDs for file input elements
function generateUniqueInputIDs() {
  const fileInputs = document.querySelectorAll('.file-input');
  fileInputs.forEach((fileInput, index) => {
    const uniqueID = `fileInput${index}`;
    fileInput.id = uniqueID;
    const label = fileInput.nextElementSibling;
    label.setAttribute('for', uniqueID);
  });
}

// Call the function to generate unique IDs after the page loads
document.addEventListener('DOMContentLoaded', generateUniqueInputIDs);


// 
// LOCALSTORAGE
function saveImageData(imageIndex, imageURL) {
  const imageArray = getSavedImageArray();
  imageArray[imageIndex] = imageURL;
  localStorage.setItem('uploaded_images', JSON.stringify(imageArray));
}

function loadImagesFromLocalStorage() {
  const imageArray = getSavedImageArray();

  for (let i = 0; i < imageGrid.children.length; i++) {
    const gridItem = imageGrid.children[i];
    const imageElement = gridItem.querySelector('.uploaded-image');
    const labelElement = gridItem.querySelector('.upload-label');
    const imageIndex = parseInt(imageElement.getAttribute('data-index'), 10);
    const imageURL = imageArray[imageIndex];

    if (imageURL) {
      imageElement.src = imageURL;
      labelElement.classList.add('image-has-been-uploaded'); // Add the class if an image is present
    }
  }
}

function getSavedImageArray() {
  const savedImageData = localStorage.getItem('uploaded_images');
  return savedImageData ? JSON.parse(savedImageData) : [];
}

loadImagesFromLocalStorage();

// Get a reference to the clear button
const clearButton = document.getElementById('clearLocalStorageButton');

// Add an event listener to the clear button
clearButton.addEventListener('click', clearLocalStorage);

// Function to clear the localStorage
function clearLocalStorage() {
  localStorage.removeItem('uploaded_images');

  // Reload the page to refresh the image grid
  location.reload();
}

