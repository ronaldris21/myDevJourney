var texto = document.getElementById("txtNumLineas");
var btnEdad = document.getElementById("btnSubmitDibujo");
btnEdad.addEventListener("mousemove",clickbtnDibujo);

var canvas1 = document.getElementById("dibujito");
var lienzo1 = canvas1.getContext("2d");

var canvas2 = document.getElementById("dibujito2");
var lienzo2 = canvas2.getContext("2d");

function dibujarLinea(lienzo, color, xinicial, yinicial, xfinal, yfinal)
{
        
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.moveTo(xinicial,yinicial);
    lienzo.lineTo(xfinal ,yfinal);
    lienzo.stroke();
}


function dibujarFigura(lienzo, color, xorigin, yorigin, size, des)
{
    var xmax = xorigin + size;
    var ymax = yorigin + size;
    var lineas =size/des;
    for(l=0; l<=lineas;l++)
    {
        dibujarLinea(lienzo, color,xmax-des*l,yorigin,xorigin,yorigin+des*l); //1
        dibujarLinea(lienzo, color,xorigin,yorigin +des*l,xorigin + des*l,ymax); //2
        dibujarLinea(lienzo, color,xorigin+ des*l,ymax,xmax,ymax-des*l); //3
        dibujarLinea(lienzo, color,xmax,ymax-des*l,xmax-des*l,yorigin); //4
    }

}

function clickbtnDibujo()
{
    lienzo2.clearRect(0,0,canvas2.clientWidth, canvas2.height);
    dibujarFigura(lienzo2,color,0,0,300,300 / parseInt(texto.value));
    
}

var color = "blue";

dibujarFigura(lienzo1, color,0,0,300,10);
dibujarFigura(lienzo1, color,0,0,150,10);
dibujarFigura(lienzo1, color,0,150,150,10);
dibujarFigura(lienzo1, color,150,150,150,10);
dibujarFigura(lienzo1, color,150,0,150,10);

dibujarFigura(lienzo1, color,75,75,150,5);

dibujarFigura(lienzo1, color,0,0,150/2,5);
dibujarFigura(lienzo1, color,0,150+75,150/2,5);
dibujarFigura(lienzo1, color,150+75,150+75,150/2,5);
dibujarFigura(lienzo1, color,150+75,0,150/2,5);


