const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

function changeColor(event) {
    ctx.strokeStyle = event.target.style.backgroundColor
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

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener('input', handleRangeChange)
}