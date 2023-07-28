# ISSUES
- Single image fullscreen view, left right image rotate, followed by escape, images then appear slightly zoomed in when escaped back into their slots.

- clicking anywhere outside of dual view closes fullscreen but single view fullscreen doesn't (have to click current open image)

# TODO

- bulk dump 12 files directly into slot

- refactor code following tight.js reference











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