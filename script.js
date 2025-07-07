const grids   = document.querySelector("#grids");
const gridSize = 16;           
const slider = document.querySelector(".slider")
let mousedown = false;
document.body.onmousedown = () => (mousedown = true)
document.body.onmouseup = () => (mousedown = false)
const colordiv =document.querySelector("#head");

colordiv.addEventListener("input", (e)=>{e.target.value;})

const toolButtons = document.querySelectorAll('#tools button');
let mode = 'brush';   
let lastMode = mode; 
function activateButton(clickedBtn) {
  toolButtons.forEach(btn => {
    btn.classList.remove('active');
    btn.disabled = false;    
  });
  clickedBtn.classList.add('active');
  if (clickedBtn.id !== 'colorpicker') {
    lastMode = clickedBtn.id;
  }
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
    cell.style.background = '#ffffff';
  });
}

function parseToRGB(color) {
  color = color.trim();
  if (color[0] === '#') {
    const num = parseInt(color.slice(1), 16);
    return {
      r: (num >> 16) & 0xFF,
      g: (num >>  8) & 0xFF,
      b:  num        & 0xFF
    };
  }
  const match = color.match(/rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/i);
  if (match) {
    return {
      r: parseInt(match[1], 10),
      g: parseInt(match[2], 10),
      b: parseInt(match[3], 10)
    };
  }
  return { r: 0, g: 0, b: 0 };
}

function toHex({ r, g, b }) {
  const hr = r.toString(16).padStart(2, '0');
  const hg = g.toString(16).padStart(2, '0');
  const hb = b.toString(16).padStart(2, '0');
  return `#${hr}${hg}${hb}`;
}

function tweakRGB(color, percent) {
  console.log(color);
  let { r, g, b } = parseToRGB(color);
  const delta = Math.round(255 * percent);
  r = Math.min(255, Math.max(0, r + delta));
  g = Math.min(255, Math.max(0, g + delta));
  b = Math.min(255, Math.max(0, b + delta));
  return toHex({ r, g, b });
}



let resetbutton = document.querySelector("#reset");
resetbutton.addEventListener('click',resetcanvas);




function draw(e){
  const current = e.target.style.background || "#ffffff";
  if (e.type === 'mouseenter' && !mousedown) return
  if(mode == "brush"){
    e.target.style.background = colordiv.value;
  }
  else if(mode == "eraser"){
    e.target.style.background = "white";
  }
  else if(mode == "rainbow"){
    let R = Math.floor(Math.random() * 256)
    let G = Math.floor(Math.random() * 256)
    let B = Math.floor(Math.random() * 256)
    e.target.style.background = `rgb(${R},${G},${B})`
  }
  else if (mode === 'highlight') {
    e.target.style.background = tweakRGB(current, +0.10);
  } else if (mode === 'shader') {
    e.target.style.background = tweakRGB(current, -0.10);
  }
}

const saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => {
  html2canvas(document.getElementById('grids'))
    .then(canvas => {
      const link = document.createElement('a');
      link.download = 'my-pixel-art.png';
      link.href = canvas.toDataURL();
      link.click();
    })
    .catch(err => {
      console.error('Snapshot failed:', err);
    });
});



function color_picker(e){
  if(mode == "colorpicker"){
    const rgb = e.target.style.backgroundColor || "rgb(255,255,255)";
    const { r, g, b } = parseToRGB(rgb);
    colordiv.value = toHex({ r, g, b });  
    activateButton(document.querySelector(`#${lastMode}`));
  }
}
function buildGrid(size) {
  grids.innerHTML = "";       

  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.style.flex = `1 1 ${100 / size}%`;
    cell.draggable = false;
    cell.style.background = "rgb(255,255,255)";
    cell.addEventListener("dragstart", e => e.preventDefault());
    cell.addEventListener("mouseenter",  draw);
    cell.addEventListener("mousedown",  draw);
    cell.addEventListener("click",color_picker)
    grids.appendChild(cell);
  }
}
buildGrid(gridSize);

slider.addEventListener("change",(e)=>{buildGrid(e.target.value)});
slider.addEventListener("input",(e)=>{ let slider_text = document.querySelector("#size-text");
  slider_text.textContent =`${e.target.value} X ${e.target.value}`})