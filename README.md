# TODO

- style single image full screen same as dual image full screen with white background.

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