const grids   = document.querySelector("#grids");
const gridSize = 16;           

function buildGrid(size) {
  grids.innerHTML = "";       

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.flex = `0 1 ${100 / size}%`;
    grids.appendChild(cell);
  }
}
buildGrid(gridSize);
