document.addEventListener("keydown",dibujarTeclado);

var canvas =  document.getElementById("area_dibujo");
var lienzo = canvas.getContext("2d");

canvas.addEventListener("mousedown",mousedownCanvas);
canvas.addEventListener("mousemove",drawUsingMouse);
canvas.addEventListener("mouseup",mouseupCanvas);
var teclas = {
    UP:38,
    DOWN:40,
    LEFT:37,
    RIGHT:39
};

var posX = 150;
var posY = 150;

function drawPixel(xDiff,yDiff)
{
    lienzo.beginPath();
    lienzo.strokeStyle = "blue";
    lienzo.moveTo(posX,posY);
    posX += xDiff;
    posY += yDiff; 
    lienzo.lineTo(posX,posY);
    lienzo.stroke();

}

function dibujarTeclado(evento)
{
    switch(evento.keyCode)
    {
        case teclas.DOWN: drawPixel(0,2);
        break;
        case teclas.UP: drawPixel(0,-2);
        break;
        case teclas.LEFT: drawPixel(-2,0);
        break;
        case teclas.RIGHT: drawPixel(2,0);
        break;
           
    }
}

var canDraw = false;
//This variables overwrite last coordinates for better drawing with mouse
var mouseX;
var mouseY;
function mousedownCanvas()
{
    canDraw = true;
    posX = mouseX;
    posY = mouseY;
}
function mouseupCanvas()
{

    canDraw = false;
}
function drawUsingMouse(event)
{
    if(canDraw)
    {
        drawPixel(event.layerX - posX , event.layerY - posY);
    }
    else
    {
        mouseX =  event.layerX;
        mouseY = event.layerY;
    }
}

