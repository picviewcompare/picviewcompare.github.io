const imageGrid = document.getElementById('imageGrid');
const imageArray = getInitialImageArray();

let clickCount = 0;
let lastButtonIndex = -1;
let firstButtonIndex = -1;
let secondButtonIndex = -1;


function handleImageUpload(event) {
  const file = event.target.files[0];
  const reader = new FileReader();
  const gridItem = event.target.closest('.grid-item');
  const imageElement = gridItem.querySelector('.uploaded-image');
  const imageIndex = parseInt(imageElement.getAttribute('data-index'), 10);
  const labelElement = gridItem.querySelector('.upload-label');
  const numberedButton = document.querySelector(`.image-btn[data-index="${imageIndex}"]`);

  reader.onload = function(event) {
    const imageURL = event.target.result;
    imageElement.src = imageURL;

    saveImageData(imageIndex, imageURL);

    labelElement.classList.add('image-has-been-uploaded');

    numberedButton.classList.remove('disabled'); // Enable the corresponding numbered button
  };

  // If the file input is empty (image removed), update the UI accordingly
  if (!file) {
    imageElement.src = ''; // Clear the image source
    saveImageData(imageIndex, null); // Save the empty image URL
    labelElement.classList.remove('image-has-been-uploaded');

    numberedButton.classList.add('disabled'); // Disable the corresponding numbered button
  }

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
  updateNumberedButtons();
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


function renderButtons() {
  const buttonContainer = document.getElementById('buttonContainer');

  for (let i = 0; i < imageGrid.children.length; i++) {
    const button = document.createElement('button');
    button.innerText = `${i + 1}`;
    button.classList.add("image-btn");
    button.classList.add("disabled");
    button.dataset.index = i;
    button.addEventListener('click', handleButtonClick);
    buttonContainer.appendChild(button);
  }
}

function removeAllSelectedClasses() {
  const buttons = document.querySelectorAll('.image-btn');
  buttons.forEach(button => button.classList.remove('selected'));
}

function handleButtonClick(event) {
  const buttonIndex = parseInt(event.target.dataset.index, 10);

  if (firstButtonIndex === -1) {
    removeAllSelectedClasses(); // Remove the .selected class from all buttons
    firstButtonIndex = buttonIndex;
    event.target.classList.add('selected'); // Add the .selected class to the first button
  } else if (secondButtonIndex === -1 && firstButtonIndex !== buttonIndex) {
    removeAllSelectedClasses(); // Remove the .selected class from all buttons
    secondButtonIndex = buttonIndex;
    event.target.classList.add('selected'); // Add the .selected class to the second button

    const imageElement1 = imageGrid.children[firstButtonIndex].querySelector('.uploaded-image');
    const imageElement2 = imageGrid.children[secondButtonIndex].querySelector('.uploaded-image');

    if (imageElement1 && imageElement2) {
      openImagesSideBySide(imageElement1.src, imageElement2.src);
    }

    firstButtonIndex = -1;
    secondButtonIndex = -1;
  }
}


function handleButtonMouseDown(event) {
  const buttonIndex = parseInt(event.target.dataset.index, 10);

  if (buttonIndex === lastButtonIndex) {
    clickCount++;
  } else {
    clickCount = 1;
    lastButtonIndex = buttonIndex;
  }

  if (clickCount === 2) {
    const imageElement1 = imageGrid.children[lastButtonIndex].querySelector('.uploaded-image');
    const imageElement2 = imageGrid.children[buttonIndex].querySelector('.uploaded-image');

    if (imageElement1 && imageElement2) {
      openImagesSideBySide(imageElement1.src, imageElement2.src);
    }

    event.target.classList.remove('selected');
    clickCount = 0;
  }
}

function handleButtonMouseUp(event) {
  event.preventDefault(); // Prevent button focus on click
}

function openImagesSideBySide(src1, src2) {
  const overlay = document.createElement('div');
  overlay.classList.add('overlay');

  const modal = document.createElement('div');
  modal.classList.add('modal');

  const leftImage = createImageElement(src1);
  const rightImage = createImageElement(src2);

  const imageContainer = document.createElement('div');
  imageContainer.classList.add('splitscreen-container');
  imageContainer.appendChild(leftImage);
  imageContainer.appendChild(rightImage);

  modal.appendChild(imageContainer);
  overlay.appendChild(modal);

  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    document.body.removeChild(overlay);
    removeAllSelectedClasses();
  });
}

function updateNumberedButtons() {
  const buttons = document.querySelectorAll('.image-btn');
  buttons.forEach((button, index) => {
    const imageURL = imageArray[index];
    if (imageURL) {
      button.classList.remove('disabled');
    } else {
      button.classList.add('disabled');
    }
  });
}



function createImageElement(src) {
  const image = document.createElement('img');
  image.src = src;
  image.classList.add('modal-image');
  return image;
}

renderButtons();



