const slider = document.querySelector("#range");
const gridCount = document.querySelector('#grid');
const sketchCanvas = document.querySelector('#sketch');

(function() {
  const counter = (gridCount.dataset.grid) ** 2;
  for (let i = 0; i < counter; i++) {
    sketchCanvas.appendChild(document.createElement('div'));
  }
})();

slider.addEventListener('input', function(e) {
  const newGridSize = this.value;
  const oldGridAmount = (gridCount.dataset.grid) ** 2;
  const newGridAmount = (newGridSize) ** 2;

  gridCount.textContent = `${newGridSize} X ${newGridSize}`;
  gridCount.dataset.grid = newGridSize;

  let divAction = (oldGridAmount < newGridAmount) ? 
    (element) => element.appendChild(document.createElement('div')) :
    (element) => element.removeChild(sketchCanvas.lastElementChild);

  const counter = Math.abs(newGridAmount - oldGridAmount);

  for (let i = 0; i < counter; i++) {
    divAction(sketchCanvas);
  }
});

