const imageGrid = document.getElementById('imageGrid');
let currentImageIndex = 0;
const imageArray = getInitialImageArray();

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
    // updateUploadLabels();
  };

  if (file) {
    reader.readAsDataURL(file);
  }
}

function toggleFullScreen(imageElement) {
  const gridItem = imageElement.closest('.grid-item');
  const labelElement = gridItem.querySelector('.upload-label');

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
  } while (!imageArray[nextIndex] && nextIndex !== currentIndex);

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


function saveImageData(imageIndex, imageURL) {
  imageArray[imageIndex] = imageURL;
  updateUploadLabels();
}

function getInitialImageArray() {
  return new Array(imageGrid.children.length).fill(null);
}

updateUploadLabels();

function updateUploadLabels() {
  const uploadLabels = document.querySelectorAll('.upload-label');
  uploadLabels.forEach((uploadLabel, index) => {
    const imageURL = imageArray[index];
    if (imageURL) {
      uploadLabel.classList.add('image-has-been-uploaded');
      uploadLabel.innerText = "Swap Image";
    } else {
      uploadLabel.classList.remove('image-has-been-uploaded');
      uploadLabel.innerText = "Add Image";
    }
  });
}

loadImagesFromMemory();

function loadImagesFromMemory() {
  for (let i = 0; i < imageGrid.children.length; i++) {
    const gridItem = imageGrid.children[i];
    const imageElement = gridItem.querySelector('.uploaded-image');
    const labelElement = gridItem.querySelector('.upload-label');
    const imageURL = imageArray[i];

    if (imageURL) {
      imageElement.src = imageURL;
      labelElement.classList.add('image-has-been-uploaded');
    }
  }
}


// 
// 
// 
// 


// Slider
const gridSizeSlider = document.getElementById('gridSizeSlider');
gridSizeSlider.addEventListener('input', handleGridSizeChange);

function getViewportSize() {
  const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  return { width, height };
}

function setSliderAttributesForViewport(width) {
  if (width >= 768) {
    gridSizeSlider.min = 220;
    gridSizeSlider.max = 500;
    gridSizeSlider.step = 10;
    gridSizeSlider.value = 200;
  } else {
    // Set different attributes for smaller viewport sizes
    gridSizeSlider.min = 100;
    gridSizeSlider.max = 300;
    gridSizeSlider.step = 5;
    gridSizeSlider.value = 150;
  }
}


// Get viewport size and set slider attributes initially
const viewportSize = getViewportSize();
setSliderAttributesForViewport(viewportSize.width);

// Update slider attributes when the viewport is resized
window.addEventListener('resize', () => {
  const viewportSize = getViewportSize();
  setSliderAttributesForViewport(viewportSize.width);
});


function handleGridSizeChange() {
  const gridSize = gridSizeSlider.value;
  setGridItemSize(gridSize);
}

function setGridItemSize(size) {
  const gridItems = document.querySelectorAll('.grid-item');
  gridItems.forEach((item) => {
    item.style.width = `${size}px`;
    item.style.height = `${size}px`;
  });
}





// 
// 
// 
const resize = document.getElementById('resize');
window.addEventListener(
  "resize",
  function () {
    resize.innerText = window.innerWidth;
  }
)