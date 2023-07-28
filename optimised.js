// Constants
const CLASS_IMAGE_UPLOADED = 'image-has-been-uploaded';
const CLASS_BUTTON_DISABLED = 'disabled';
const KEY_ESCAPE = 'Escape';
const KEY_ARROW_LEFT = 'ArrowLeft';
const KEY_ARROW_RIGHT = 'ArrowRight';

// DOM elements
const imageGrid = document.getElementById('imageGrid');
const imageArray = getInitialImageArray();
const buttonContainer = document.getElementById('buttonContainer');

// State variables
let clickCount = 0;
let lastButtonIndex = -1;
let firstButtonIndex = -1;
let secondButtonIndex = -1;

// Event listeners
document.addEventListener('DOMContentLoaded', generateUniqueInputIDs);
document.addEventListener('keydown', handleKeyPress);

// File upload handler
function handleImageUpload(event) {
  // ... (existing code for handling image upload)
}

// Toggle full-screen mode
function toggleFullScreen(imageElement) {
  // ... (existing code for toggling full-screen mode)
}

// Handle keypress events
function handleKeyPress(event) {
  // ... (existing code for handling keypress events)
}

// Find the next valid index in the imageArray
function findNextValidIndex(currentIndex, forward = true, maxIndex) {
  // ... (existing code for finding next valid index)
}

// Generate unique input IDs for file inputs
function generateUniqueInputIDs() {
  // ... (existing code for generating unique input IDs)
}

// Save image data to the imageArray and update labels
function saveImageData(imageIndex, imageURL) {
  // ... (existing code for saving image data)
}

// Get the initial image array
function getInitialImageArray() {
  return new Array(imageGrid.children.length).fill(null);
}

// Update the labels of the upload buttons
function updateUploadLabels() {
  // ... (existing code for updating upload labels)
}

// Load images from memory to the imageGrid
function loadImagesFromMemory() {
  // ... (existing code for loading images from memory)
}

// Render numbered buttons
function renderButtons() {
  // ... (existing code for rendering numbered buttons)
}

// Remove the 'selected' class from all buttons
function removeAllSelectedClasses() {
  // ... (existing code for removing 'selected' class)
}

// Handle button click events
function handleButtonClick(event) {
  // ... (existing code for handling button click events)
}

// Handle button mousedown events
function handleButtonMouseDown(event) {
  // ... (existing code for handling button mousedown events)
}

// Handle button mouseup events
function handleButtonMouseUp(event) {
  // ... (existing code for handling button mouseup events)
}

// Open images side by side in a modal
function openImagesSideBySide(src1, src2) {
  // ... (existing code for opening images side by side)
}

// Update numbered buttons based on image data
function updateNumberedButtons() {
  // ... (existing code for updating numbered buttons)
}

// Create an image element
function createImageElement(src) {
  // ... (existing code for creating an image element)
}

// Initialize the page
function initializePage() {
  renderButtons();
  loadImagesFromMemory();
  updateUploadLabels();
  updateNumberedButtons();
}

initializePage();
