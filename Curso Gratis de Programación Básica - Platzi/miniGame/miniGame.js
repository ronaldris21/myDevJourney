var canvas =  document.getElementById("canvas");
var lienzo = canvas.getContext("2d");
var imgBackground = {
    url: "tile.webp",
    isReady:false
};
var imgVaca = {
    url: "vaca.webp",
    isReady:false
};
var imgCerdo = {
    url: "cerdo.webp",
    isReady:false
};
var imgPollo = {
    url: "pollo.webp",
    isReady:false
};

imgBackground.image = new Image();
imgBackground.image.src = imgBackground.url;
imgBackground.image.addEventListener("load",loadBackground);


imgVaca.image = new Image();
imgVaca.image.src = imgVaca.url;
imgVaca.image.addEventListener("load",loadVaca);

imgCerdo.image = new Image();
imgCerdo.image.src = imgCerdo.url;
imgCerdo.image.addEventListener("load",loadCerdo);


imgPollo.image = new Image();
imgPollo.image.src = imgPollo.url;
imgPollo.image.addEventListener("load",loadPollo);


function numRandom(min,max)
{
    return min + Math.floor(Math.random()*(max-min+1));
}

function loadBackground()
{
    imgBackground.isReady=true;
    dibujar();
}

function loadVaca()
{
    imgVaca.isReady = true;
    dibujar();
}

function loadCerdo()
{
    imgCerdo.isReady = true;
    dibujar();
}

function loadPollo()
{
    imgPollo.isReady = true;
    dibujar();
}

function dibujar()
{
    lienzo.clearRect(0,0,500,500);
    var cant = numRandom(1,20);
    if(imgBackground.isReady)
        lienzo.drawImage(imgBackground.image,0,0);
    if(imgPollo.isReady)
    {
        for(var i=0;i<cant;i++)
        {
            lienzo.drawImage(imgPollo.image, numRandom(0,420),numRandom(0,420));
        }
    }
    if(imgCerdo.isReady)
    {
        cant = numRandom(1,20);
        for(var i=0;i<cant;i++)
        {
            lienzo.drawImage(imgCerdo.image, numRandom(0,420),numRandom(0,420));
        }
    }
    if(imgVaca.isReady)
    {
        cant = numRandom(1,10);
        for(var i=0;i<cant;i++)
        {
            lienzo.drawImage(imgVaca.image, numRandom(0,420),numRandom(0,420));
        }
    }
}