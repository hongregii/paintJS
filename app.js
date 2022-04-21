const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";
const canvasWidth = canvas.offsetWidth;
const canvasHeight = canvas.offsetHeight;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

ctx.fillStyle = 'white';
ctx.fillRect( 0, 0, canvasWidth, canvasHeight);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function changeColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor;
    ctx.fillStyle = event.target.style.backgroundColor;
}

let painting = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(event) {
    painting = true;
}

function stopPainting(event) {
    painting = false;
}

function startPainting(event) {
    painting = true;
}

function handleRangeChange(event) {
    ctx.lineWidth = event.target.value;
}

let filling = true;

function handleModeChange(event) {
    if (filling == true) {
        filling = false;
        mode.innerText = "Fill";
        ctx.fillRect(50, 2, 100, 40);
    } else {
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleRightClick(event) {
    event.preventDefault();
}

function handleCanvasClick() {
    if (filling) {ctx.fillRect(0,0,canvasWidth, canvasHeight)};
}

function saveClick() {
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS_export.png";
    link.click();
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleRightClick);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener('input', handleRangeChange)
}

if (mode) {
    mode.addEventListener("click", handleModeChange)
}

if (save) {
    save.addEventListener("click", saveClick);
}