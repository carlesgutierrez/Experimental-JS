const cursor = document.querySelector("div.cursor")
const canvasIn = document.querySelector("canvas.in")
const canvasOut = document.querySelector("canvas.out")

let mouseX = 0;
let mouseY = 0;

let isMouseDown = false;

//----------------------------------------------

const setupCanvas = function(_canvas){
  //const bodyTag = document.querySelector("#section-1")
  //console.log(bodyTag)

  const dpi = window.devicePixelRatio;

  const w = window.innerWidth;
  const h = window.innerHeight; //bodyTag.offsetHeight; 
  console.log("w " + w + " /  h " + h);

  _canvas.width = w * dpi;
  _canvas.height = h * dpi;
  _canvas.style.width = w+"px";
  _canvas.style.height = h+"px";
  
  const context = _canvas.getContext("2d");
  context.scale(dpi, dpi);

  if(_canvas.classList.contains("out")){
    context.fillStyle = "#000000";
    context.strokeStyle = "#FFFFFF";
    console.log("canvas.classList.contains(out)")
  }else{
    context.fillStyle = "#FFFFFF";
    context.strokeStyle = "#000000";
        console.log("canvas.classList.contains(in)")
  }


  context.lineWidth = 100;
  context.lineCap = "round";
  context.lineJoin = "round";

  context.shadowBlur = 10
  context.shadowColor = context.strokeStyle;

  context.rect(0,0, w, h);
  context.fill();
  
}

setupCanvas(canvasIn);
setupCanvas(canvasOut);


//make cursor bigger when mouse is hold down
const moveCursor = function(_x, _y) {
  //console.log(_x,_y);
  cursor.style.left = _x - 0 + "px"
  cursor.style.top = _y + 0 + "px" 

}

const startDraw = function(_canvas, x, y) {
  const context = _canvas.getContext("2d");

  //const colors = ["red", "yellow", "blue", "green"];
  //const randomNum = Math.floor(Math.random()*colors.length);
  //context.strokeStyle = colors[randomNum];
  context.moveTo(x, y);
  context.beginPath(); //If not all line would be same thing and style will afect others lines.
}



const moveDraw = function(canvas, x, y) {
  const context = canvas.getContext("2d")
  context.lineTo(x, y);
  //context.fill();
  context.stroke();
}


//make cursor bigger when mouse is hold down
const growCursor = function() {
  cursor.classList.add("is-down")
  cursor.innerHTML  = "<span>Let it go please<span>"
}

//make cursor smaller when I let go of the mouse 
const shrinkCursor = function() {
  cursor.classList.remove("is-down")
  cursor.innerHTML  = "<span>Click me<span>"
}


//INTERACTION EVENTS
//----------------------------------------------
//movement
document.addEventListener("mousemove", function(_event){
	moveCursor(_event.pageX, _event.pageY)
  mouseX = _event.pageX;
  mouseY = _event.pageY;
  if(isMouseDown)moveDraw(canvasIn, mouseX, mouseY);
  if(isMouseDown)moveDraw(canvasOut, mouseX, mouseY);
})
document.addEventListener("touchmove", function(_event){
  moveCursor(_event.touches[0].pageX, _event.touches[0].pageY);
  mouseX = _event.touches[0].pageX;
  mouseY = _event.touches[0].pageY;
  if(isMouseDown)moveDraw(canvasIn, mouseX, mouseY);
  if(isMouseDown)moveDraw(canvasOut, mouseX, mouseY);
})

//PRESSED
document.addEventListener("mousedown", function(_event){
  growCursor()
  mouseX = _event.pageX;
  mouseY = _event.pageY;
  isMouseDown = true;
  startDraw(canvasIn, mouseX, mouseY)
  startDraw(canvasOut, mouseX, mouseY)
})
document.addEventListener("touchstart", function(_event){
  growCursor()
  mouseX = _event.touches[0].pageX;
  mouseY = _event.touches[0].pageY;
  isMouseDown = true;
  startDraw(canvasIn, mouseX, mouseY)
  startDraw(canvasOut, mouseX, mouseY)
})

//END PRESSED
document.addEventListener("mouseup", function(_event){
  shrinkCursor()
  mouseX = _event.pageX;
  mouseY = _event.pageY;
  isMouseDown = false;
})


document.addEventListener("touchend", function(_event){
  shrinkCursor()
  mouseX = _event.touches[0].pageX;
  mouseY = _event.touches[0].pageY;
    isMouseDown = false;
})


window.addEventListener("resize", function(){
  setupCanvas(canvasIn)
  setupCanvas(canvasOut)
})