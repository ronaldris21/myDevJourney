/*
.push()         ---- INSERT AL FINAL
.pop()          ---- RETORNA EL ULTIMO Y LO ELIMINA
.shift()        ---- RETORNA EL PRIMERO Y LO ELIMIINA
.unshift()      ---- INSERTA AL INICIO
.indexOf(dato)  ---- RETORNA LA POS del dato / -1 si no lo contiene
.filter()       ---- Retorna un array de los elementos que cumplen x function condicion
.map()          ---- hacer X operación pra cada elemento y crea un nuevo array
.find()         ---- Encuentra un objeto segun una function / undefined si no lo encuentra
.some()         ---- True o false si tiene elementos que cumplen function{}
.forEach()      ---- Recorre todos los elementos del array, util para no tener que usar un for

*/

// Un array es una estructura de datos, es un objeto tipo lista de alto nivel.
// Los arrays son objetos de tipo lista cuyo prototipo tiene métodos para realizar operaciones de recorrido y mutación

var frutas = []; // Array Literal Syntax 

var frutas = ["Manzana", "Platano", "Cereza", "Fresa"]; 
console.log(frutas); 
console.log(frutas.length); // length es una propiedad del array

// Acceder (por índice) a un elemento del Array
console.log(frutas[0]);   // Los arrays iician en "0" 


// === Metodos para mutar arrays ===


/// PUSH
var array = [1,2,3]
array.push(4,5)
console.log(array) // [ 1, 2, 3, 4, 5 ]


//SUNSHIFT
var array = [3,4,5]
array.unshift(1,2)
console.log(array) // [ 1, 2, 3, 4, 5 ]


//  POP

var array = [1,2,3,4]
var lastElement = array.pop()
console.log(lastElement) // 4
console.log(array) // [ 1, 2, 3 ]

//  SHIFT
var array = [1,2,3,4]
var firstElement = array.shift()
console.log(firstElement) // 1
console.log(array) // [ 2, 3, 4 ]


///  indexOf
var array = [1,2,3,4]
var index = array.indexOf(2)
console.log(index) // 1

var array = [1,2,3,4]
var index = array.indexOf("hola")
console.log(index) // -1





//// FILTER
const fruit = ["banana", "melón", "manzana", "pera", "patilla", "naranja"]
  
const largeNameFruit = fruit.filter(function(word){ return word.length > 6})

console.log(fruit)
console.log(largeNameFruit)
  
// Resultado
// ["banana", "melón", "manzana", "pera", "patilla", "naranja"]
// ["manzana", "patilla", "naranja"]




//// MAP
//Declaremos un array de números
var numeros = [1,2,3,4,5]

//Creemos un nuevo array aplicando una función a cada número dentro del array numeros
var cuadrados = numeros.map(function(num){ return num*num});

var cubos = numeros.map(function(numero){
  return numero * numero*numero;
})

console.log(numeros)
console.log(cuadrados)
console.log(cubos)
//Resultado en la consola
// [1, 2, 3, 4, 5]
// [1, 4, 9, 16, 25]
// [1, 8, 27, 64, 125]






//  find
var articulos = [
    { nombre: "Bici", costo: 3000 },
    { nombre: "TV", costo: 2500 },
    { nombre: "Libro", costo: 320 },
    { nombre: "Celular", costo: 10000 },
    { nombre: "Laptop", costo: 20000 },
    { nombre: "Teclado", costo: 500 },
    { nombre: "Audifonos", costo: 1700 },
  ]

  ///   FIND
  var algunArticulo = articulos.find(function(art){
    return art.nombre === "Laptop";
  })
  console.log(algunArticulo); ///Encuentra solo 1
  //{ costo:20000,nombre:Laptop }


///     SOME
var existenBaratos = articulos.some(function(art){
    return art.costo<100;
})
console.log(existenBaratos) //false

existenBaratos = articulos.some(function(art){
    return art.costo<1000;
})
console.log(existenBaratos) // true



/// FOREACH
console.log(articulos);

articulos.forEach(function(art){
    console.log(`${art.nombre} - precio: ${art.costo}`);
    art.costo = art.costo-200;
    console.log(`${art.nombre} - precio: ${art.costo}`);
})

console.log(articulos) ///Todos los precios han cambiado - 200 
