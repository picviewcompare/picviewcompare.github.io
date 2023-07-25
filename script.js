const imageGrid = document.getElementById('imageGrid');
let currentImageIndex = 0;

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

    saveImageData(imageIndex, imageURL);

    labelElement.classList.add('image-has-been-uploaded');
    
  }

  if (file) {
    reader.readAsDataURL(file);
  }
}

function toggleFullScreen(imageElement) {
    const gridItem = imageElement.closest('.grid-item');
    const labelElement = gridItem.querySelector('.upload-label');

    // Check if the label element has the "image-has-been-uploaded" class
    if (labelElement.classList.contains('image-has-been-uploaded')) {
      if (!gridItem.classList.contains('full-screen')) {
        gridItem.classList.add('full-screen');
        document.addEventListener('keydown', handleKeyPress);
      } else {
        gridItem.classList.remove('full-screen');
        document.removeEventListener('keydown', handleKeyPress);
      }
    }
  }



function handleKeyPress(event) {
  if (event.key === 'Escape') {
    const fullscreenImage = document.querySelector('.full-screen');
    if (fullscreenImage) {
      fullscreenImage.classList.remove('full-screen');
      document.removeEventListener('keydown', handleKeyPress);
    }
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    const fullscreenImage = document.querySelector('.full-screen .uploaded-image');
    if (fullscreenImage) {
      const imageElements = document.querySelectorAll('.uploaded-image');
      const fullscreenImageIndex = parseInt(fullscreenImage.getAttribute('data-index'), 10);
      const forward = event.key === 'ArrowRight';
      const newIndex = findNextValidIndex(fullscreenImageIndex, forward, imageElements.length);

      if (newIndex !== null) {
        const nextImage = imageElements[newIndex];
        const fullscreenGridItem = fullscreenImage.closest('.grid-item');
        fullscreenGridItem.classList.remove('full-screen');
        toggleFullScreen(nextImage);
      }
    }
  }
}

function findNextValidIndex(currentIndex, forward = true, maxIndex) {
  let nextIndex = currentIndex;
  const step = forward ? 1 : -1;

  do {
    nextIndex = (nextIndex + step + maxIndex) % maxIndex;
  } while (!getSavedImageArray()[nextIndex] && nextIndex !== currentIndex);

  if (nextIndex === currentIndex) {
    return null; // No valid image found in the given direction.
  }

  return nextIndex;
}




function generateUniqueInputIDs() {
  const fileInputs = document.querySelectorAll('.file-input');
  fileInputs.forEach((fileInput, index) => {
    const uniqueID = `fileInput${index}`;
    fileInput.id = uniqueID;
    const label = fileInput.nextElementSibling;
    label.setAttribute('for', uniqueID);
  });
}

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
      labelElement.classList.add('image-has-been-uploaded');
    }
  }
}

function getSavedImageArray() {
  const savedImageData = localStorage.getItem('uploaded_images');
  return savedImageData ? JSON.parse(savedImageData) : [];
}

loadImagesFromLocalStorage();




// ACTION BUTTONS
const clearButton = document.getElementById('clearLocalStorageButton');
clearButton.addEventListener('click', clearLocalStorage);

function clearLocalStorage() {
  
  const userConfirmed = confirm("Are you sure? All images will be removed from the grid.");
  if (userConfirmed) {
    localStorage.removeItem('uploaded_images');
    location.reload();
  }
}


// Upload Label add dynamic text based on image loaded in slot or not.
const uploadLabels = document.querySelectorAll('#uploadLabel');

uploadLabels.forEach(uploadLabel => {
  if (uploadLabel.classList.contains("image-has-been-uploaded")) {
    uploadLabel.innerText = "Replace Image";
  } else {
    uploadLabel.innerText = "Add Image";
  }
});
