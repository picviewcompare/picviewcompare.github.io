const imageGrid = document.getElementById('imageGrid');
let currentImageIndex = 0; // Keep track of the current image index

function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const gridItem = event.target.parentElement;
  const imageElement = gridItem.querySelector('.uploaded-image');
  const imageIndex = parseInt(imageElement.getAttribute('data-index'), 10);

  reader.onload = function(event) {
    const imageURL = event.target.result;
    imageElement.src = imageURL;

    // Save the image data to localStorage
    saveImageData(imageIndex, imageURL);
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

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
    const imageIndex = parseInt(imageElement.getAttribute('data-index'), 10);
    const imageURL = imageArray[imageIndex];

    if (imageURL) {
      imageElement.src = imageURL;
    }
  }
}

function getSavedImageArray() {
  const savedImageData = localStorage.getItem('uploaded_images');
  return savedImageData ? JSON.parse(savedImageData) : [];
}

loadImagesFromLocalStorage();

function toggleFullScreen(imageElement) {
  const gridItem = imageElement.parentElement;
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
