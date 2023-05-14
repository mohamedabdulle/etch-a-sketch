const GRID_SIZE_VARIABLE = '--grid-size';
const GRID_BACKGROUND_COLOR_VARIABLE = '--grid-background-color';
const INITIAL_GRID_SIZE = 16;
const BLACK_BORDER_OUTLINE = '1px solid black';
const slider = document.querySelector("#range");
const gridCount = document.querySelector('#grid');
const sketchCanvas = document.querySelector('#sketch');
const style = document.querySelector('style');
const sketchButtonColor = document.querySelector('#sketch-color');
const canvasButtonColor = document.querySelector('#canvas-color');
const eraser = document.querySelector('#eraser');
const resetCanvas = document.querySelector('#reset-canvas');
let sketchColor = sketchButtonColor.value;
let canvasColor = canvasButtonColor.value;
let previousBackgroundColor = canvasColor;
let isMouseDown = false;
let isDrag = false;
let root = document.documentElement;

// Canvas
sketchCanvas.onmouseover = function(event) {
  let targetStyle = event.target.style;
  previousBackgroundColor = targetStyle.backgroundColor;
  targetStyle.backgroundColor = sketchColor;
  targetStyle.border = BLACK_BORDER_OUTLINE;
};

sketchCanvas.onmouseout = function(event) {
  let targetStyle = event.target.style;
  targetStyle.border = "";
  (isMouseDown || isDrag) ? targetStyle.backgroundColor = sketchColor : targetStyle.backgroundColor = previousBackgroundColor;
  //If the cursor is not being currently dragged, then the grid box the cursor moved out of will be the last one colored.
  isMouseDown = isDrag;
};

sketchCanvas.onmouseleave = () => {
  isMouseDown = false;
  isDrag = false;
};

sketchCanvas.onmousedown = function(event) {
  event.preventDefault();
  isMouseDown = true;
  isDrag = true;
  event.target.style.backgroundColor = sketchColor;
};

sketchCanvas.onmouseup = () => isDrag = false;
//

// Slider
slider.oninput = generateGrids;
slider.onmouseup = function() { setGridProperties(this.value); };
slider.onkeyup = function() { setGridProperties(this.value); };
//

// Settings

canvasButtonColor.oninput = function() { 
  canvasColor = this.value;
  sketchCanvas.style.backgroundColor = canvasColor;
}

sketchButtonColor.onclick = function() { sketchColor = this.value; }
sketchButtonColor.oninput = function() { sketchColor = this.value; }

eraser.onclick = function() { sketchColor = "inherit"; }
resetCanvas.onclick = buildCanvas;
// 

function generateGrids() {
  const newGridCount = this.value;
  const oldGridAmount = (gridCount.dataset.grid) ** 2;
  const newGridAmount = (newGridCount) ** 2;

  gridCount.textContent = `${newGridCount} X ${newGridCount}`;
  gridCount.dataset.grid = newGridCount;

  let divAction = (oldGridAmount < newGridAmount) ? 
    (element) => element.appendChild(document.createElement('div')) :
    (element) => element.removeChild(sketchCanvas.lastElementChild);

  const counter = Math.abs(newGridAmount - oldGridAmount);

  setGridProperties(newGridCount, BLACK_BORDER_OUTLINE);

  for (let i = 0; i < counter; i++) {
    divAction(sketchCanvas);
  }
}

function setGridProperties(gridCount = 16, color = "") {
  root.style.setProperty(GRID_SIZE_VARIABLE, `calc(100%/${gridCount})`);
  root.style.setProperty(GRID_BACKGROUND_COLOR_VARIABLE, color);
}

function buildCanvas() {
  const counter = (INITIAL_GRID_SIZE) ** 2;
  gridCount.textContent = `${INITIAL_GRID_SIZE} X ${INITIAL_GRID_SIZE}`;
  gridCount.dataset.grid = INITIAL_GRID_SIZE;
  slider.value = INITIAL_GRID_SIZE;
  setGridProperties(INITIAL_GRID_SIZE);

  const initialCanvasDivs = [];
  for (let i = 0; i < counter; i++) {
    initialCanvasDivs[i] = document.createElement('div');
  }
  sketchCanvas.replaceChildren(...initialCanvasDivs)
}

buildCanvas()