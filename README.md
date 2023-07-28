# ISSUES
- Single image fullscreen view, left right image rotate, followed by escape: which ever image was penultimate appears slightly zoomed when escaped back in its slot.

# TODO












```
.grid-item .full-screen as opposed to .grid-item.full-screen zooms the image in place inside the grid slot.
possible feature based on above classes: clicking top of image zooms in (in place - inside grid slot) with bias to top of image, clicking middle goes full screen modal, clicking bottom zooms in (in place - inside grid slot) with bias to bottom of image

```





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