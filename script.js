const initialGrid = 16;
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


sketchCanvas.onmouseover = function(event) {
  let targetStyle = event.target.style;
  previousBackgroundColor = targetStyle.backgroundColor;
  targetStyle.backgroundColor = sketchColor;
  targetStyle.border = "1px solid black";
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
  isMouseDown = true;
  isDrag = true;
  event.target.style.backgroundColor = sketchColor;
};

sketchCanvas.onmouseup = () => isDrag = false;

slider.oninput = generateGrids;
slider.onmouseup = function() { style.innerHTML = newGridSize(this.value) };
slider.onkeyup = function() { style.innerHTML = newGridSize(this.value) };
 
canvasButtonColor.oninput = function() { 
  canvasColor = this.value;
  sketchColor = canvasColor;
}

sketchButtonColor.oninput = function() { sketchColor = this.value; }

eraser.onclick = function() { sketchColor = this.value; }

resetCanvas.onclick = buildCanvas;

function generateGrids() {
  const newGridSize = this.value;
  const oldGridAmount = (gridCount.dataset.grid) ** 2;
  const newGridAmount = (newGridSize) ** 2;

  gridCount.textContent = `${newGridSize} X ${newGridSize}`;
  gridCount.dataset.grid = newGridSize;

  let divAction = (oldGridAmount < newGridAmount) ? 
    (element) => element.appendChild(document.createElement('div')) :
    (element) => element.removeChild(sketchCanvas.lastElementChild);

  const counter = Math.abs(newGridAmount - oldGridAmount);

  style.innerHTML = '#sketch div { border: 1px solid black; width: ' + `${100/newGridSize}%` + ';}';

  for (let i = 0; i < counter; i++) {
    divAction(sketchCanvas);
  }
}

function newGridSize(gridSize) {
  return '#sketch div { width: ' + `${100/gridSize}%` + ';}';
}
 
function buildCanvas() {
  const counter = (initialGrid) ** 2;
  gridCount.textContent = `${initialGrid} X ${initialGrid}`;
  gridCount.dataset.grid = initialGrid;
  slider.value = initialGrid;
  style.innerHTML = newGridSize(initialGrid);

  const initialCanvasDivs = [];
  for (let i = 0; i < counter; i++) {
    initialCanvasDivs[i] = document.createElement('div');
  }
  sketchCanvas.replaceChildren(...initialCanvasDivs)
};

buildCanvas()