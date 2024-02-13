import React, { useEffect, useRef } from 'react';

const DibujitoCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Función para dibujar una línea
    function dibujarLinea(lienzo, color, xinicial, yinicial, xfinal, yfinal) {
      lienzo.beginPath();
      lienzo.strokeStyle = color;
      lienzo.moveTo(xinicial, yinicial);
      lienzo.lineTo(xfinal, yfinal);
      lienzo.stroke();
    }

    // Función para dibujar la figura
    function dibujarFigura(lienzo, color, xorigin, yorigin, size, des) {
      var xmax = xorigin + size;
      var ymax = yorigin + size;
      var lineas = size / des;
      for (let l = 0; l <= lineas; l++) {
        dibujarLinea(lienzo, color, xmax - des * l, yorigin, xorigin, yorigin + des * l); //1
        dibujarLinea(lienzo, color, xorigin, yorigin + des * l, xorigin + des * l, ymax); //2
        dibujarLinea(lienzo, color, xorigin + des * l, ymax, xmax, ymax - des * l); //3
        dibujarLinea(lienzo, color, xmax, ymax - des * l, xmax - des * l, yorigin); //4
      }
    }

    // Dibujar el logo un poco más grande y hacia abajo
    var color = "black";
    dibujarFigura(context, color, 0, 20, 100, 2.5);
    dibujarFigura(context, color, 0, 20, 50, 2.5);
    dibujarFigura(context, color, 0, 70, 50, 2.5);
    dibujarFigura(context, color, 50, 70, 50, 2.5);
    dibujarFigura(context, color, 50, 20, 50, 2.5);
    dibujarFigura(context, color, 25, 45, 50, 1.25);
    dibujarFigura(context, color, 0, 20, 25, 1.25);
    dibujarFigura(context, color, 0, 95, 25, 1.25);
    dibujarFigura(context, color, 75, 95, 25, 1.25);
    dibujarFigura(context, color, 75, 20, 25, 1.25);

  }, []);

  return <canvas id="dibujito" ref={canvasRef}></canvas>;
};

export default DibujitoCanvas;
