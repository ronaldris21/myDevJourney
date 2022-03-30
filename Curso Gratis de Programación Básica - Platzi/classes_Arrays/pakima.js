var boxes = [];
boxes["Tocinauro"] = "../miniGame/cerdo.webp";
boxes["Cauchin"] = "../miniGame/vaca.webp";
boxes["Pokacho"] = "../miniGame/pollo.webp";

console.log(boxes);

// var cauchin = new Pakiman("Cauchin",100,30);
// var pokacho = new Pakiman("Pokacho",80,50);
// var tocinauro = new Pakiman("Tocinauro",120,40);

// cauchin.mostrar();
// pokacho.mostrar();
// tocinauro.mostrar();

var coleccion = [];
coleccion.push(new Pakiman("Cauchin",100,30));
coleccion.push(new Pakiman("Pokacho",80,50));
coleccion.push(new Pakiman("Tocinauro",120,40));

console.log(coleccion);

for(var pakin of coleccion)
{
    pakin.mostrar();
}

console.log("var x of boxes");
for(var x of boxes)
{
    console.log(x);
}
console.log("var x in boxes");
for(var x in boxes)
{
    console.log(x);
}


console.log("var x in coleccion[0]");
for(var x in coleccion[0])
{
    console.log(x);
}


console.log("var x of coleccion");
for(var x of coleccion)
{
    console.log(x);
}

console.log("var x in coleccion");
for(var x in coleccion)
{
    console.log(x);
}


