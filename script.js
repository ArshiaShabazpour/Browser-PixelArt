const grids   = document.querySelector("#grids");
const gridSize = 16;           

let mousedown = false;
document.body.onmousedown = () => (mousedown = true)
document.body.onmouseup = () => (mousedown = false)
const colordiv =document.querySelector("#head");

colordiv.addEventListener("input", (e)=>{e.target.value;})

const toolButtons = document.querySelectorAll('#tools button');
let mode = 'color';   

function activateButton(clickedBtn) {
  toolButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.disabled = false;    
  });
  clickedBtn.classList.add('active');
  mode = clickedBtn.id;
  console.log(mode)
}

toolButtons.forEach(button => {
  if(button.id != "reset"){
  button.addEventListener('click', () => activateButton(button));
  }
});

function resetcanvas(){
  array = document.querySelectorAll('#grids div');
  array.forEach(cell => {
    cell.style.background = "white";
  });
}



let resetbutton = document.querySelector("#reset");
resetbutton.addEventListener('click',resetcanvas);


function buildGrid(size) {
  grids.innerHTML = "";       

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.flex = `1 1 ${100 / size}%`;
    cell.addEventListener("mouseenter",  function (e){ if(mousedown){e.target.style.background = colordiv.value;}});
    cell.addEventListener("mousedown",  function (e){e.target.style.background = colordiv.value;});
    grids.appendChild(cell);
  }
}
buildGrid(gridSize);
