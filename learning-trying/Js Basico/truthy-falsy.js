// Truthy y Falsy 

// Son valores que son verdaderos o falsos 

// Falsy (False)

"" // un string vacío 
// Coersión explícita
Boolean(0) // false
Boolean("") // false
Boolean(null) // false
Boolean(undefined) // false
Boolean(NaN) // false
Boolean(false) // false

//Truthy (true)

// Coersión explícita
Boolean(12) // true
Boolean("hola") // true
Boolean(true) // true
Boolean([1, 2, 3]) // true
Boolean(function hola() {}) // true
Boolean({ a: 1, b: 2 }) // true
Boolean([]) // true
Boolean({}) // true
// Para que podemos utilizar esto, para generar condiciones segun el valor que demos. 

if(InputEvent.value) {

}
