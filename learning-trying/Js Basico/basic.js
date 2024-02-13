40;
"xd"
true
false

null
undefined

[0,1,2,3]
{nombre:"Ris"}

// 

var elementos = [0,2,4,4];
var persona = {
    nombre: "Ris",
    edad: 23
}

console.log(persona.nombre);

///fUNCIONES

//declarativas
function miFuncion()
{
    return 4;
}

//Expresion
var suma = function(a,b){
    return a+b;
}

console.log(suma(4,7));

function saludar(nombre){
    console.log(`Hola ${nombre} Nice!!`); // alt + 96 ``
}

saludar("Ronald");





/////////////////   SCOPE

var nombre = "Ronald" ; //Global Scope


function saludo() {
    let nombre = "Andres"
    console.log(nombre)
}

saludo() // "Andres"
console.log(nombre) // ReferenceError: nombre is not defined







///switch
var parImpar = function(caso)
{    
    switch(caso%2)
    {
        case 1:{
            console.log("Impar")
            break;
        }
        case 0:{
            console.log("Par")
            break;
        }
        default:
            {
                console.log("No es numero")
            }
    }
}

var getTipo = function(dato){
    console.log("Tipo de dato Real: "+ typeof dato);
    switch (typeof dato) {
        case typeof "":
            console.log("\"\"")
            break;
        case typeof {}:
            console.log("{}")
            break;
        case typeof 7:
            console.log("Number")
            break;
        default:
            break;
    }
}
