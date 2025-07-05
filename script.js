const grids   = document.querySelector("#grids");
const gridSize = 16;           

let mousedown = false;
document.body.onmousedown = () => (mousedown = true)
document.body.onmouseup = () => (mousedown = false)
const colordiv =document.querySelector("#head");
const color = colordiv.value;

colordiv.addEventListener("input", (e)=>{e.target.value;})



function buildGrid(size) {
  grids.innerHTML = "";       

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.flex = `1 1 ${100 / size}%`;
    cell.addEventListener("mouseenter",  function (e){ if(mousedown){e.target.style.background = color;}});
    grids.appendChild(cell);
  }
}
buildGrid(gridSize);
