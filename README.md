# TODO
- issue with small images on smaller screens (object-fit: contain) causes image to bloat


```
/* Display viewport width data on screen when browser is resized */ 
 
const resize = document.getElementById('resize');
window.addEventListener(
  "resize",
  function () {
    resize.innerText = window.innerWidth;
  }
)
```