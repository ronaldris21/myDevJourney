interface Person {
    name: string;
    age: number;
    readonly pin: string;
}

type Person2 = {
    name: string;
    age: number;
}

function greet(person: Person) {
    return "Hello Mr " + person.name;
}

console.log(greet({
    age: 24,
    name: "Ris",
    pin: "asda"
}))





/// INDEX SIGNATURES:
interface stringArray {
    [index: number]: string;
}


export interface ShippingStatus {
    orderNum: number;
    status: string;
}

interface ShippingStatusDictionary {
    [orderNumber: number]: ShippingStatus; // Index signature to allow dynamic keys
}

// Example usage:
const shippingStatusMap: ShippingStatusDictionary = {
    71000: { orderNum: 71000, status: "delivered" },
    71001: { orderNum: 71001, status: "in process" },
    71002: { orderNum: 71002, status: "delayed" },
};

console.log(" INDEX SIGNATURES");

// Accessing a shipping status by order number:
console.log(shippingStatusMap[71001]); // Output: { orderNum: 71001, status: "in process" }





///Checking typing errors:
// @errors: 2345 2739
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}

let mySquare = createSquare({ color: "red", width: 100 });
console.log(mySquare);



///Extending Types
interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
}

//Extend properties
//   interface AddressWithUnit{
//     name?: string;
//     street: string;
//     city: string;
//     country: string;
//     postalCode: string;
//     unit: string;
//   }

//better approach
interface AddressWithUnit extends BasicAddress {
    unit: string;
}



interface Colorful {
    color: string;
}

interface Circle {
    radius: number;
}


// interface ColorfulCircle extends Colorful, Circle {}
type ColorfulCircle = Colorful & Circle;

const cc: ColorfulCircle = {
    color: "Blue",
    radius: 25
}

console.log(cc);


/// GENERIC 
interface BoxGeneric {
    contents: any;
}


interface Box<Type> {
    contents: Type;
}

let c: Box<string> = {
    contents: "sa",
}


// Generic type aliases:
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type OneOrManyOrNull<Type> = OrNull<OneOrMany<Type>>;

type OneOrManyOrNullStrings = OneOrManyOrNull<string>;

// ARRAYS:
function doSomething(value: Array<string>) {

}

let names: string[] = ["Ris", "kai"]


function doStuff(values: ReadonlyArray<string>) {
    // We can read from 'values'...
    const copy = values.slice();
    console.log(`The first value is ${values[0]}`);
    copy.push("xd");
    console.log([values, copy]);

    // ...but we can't mutate 'values'.
    // values.push("hello!");
}

doStuff(["Ris", "kai"]);


type Either2dOr3d = [number, number, number?];

function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord; //z can be number or undefined
    console.log(`Provided coordinates had ${coord.length} dimensions`);
}

setCoordinate([4, 5, 6])
setCoordinate([8, 9]);




function greet2(person: string, date: Date) {
    console.log(`Hello ${person}, today is ${date.toDateString()}!`);
}

greet2("Ronald", new Date());





// UNION TYPES
let someValue: number | string;
someValue = 4;
someValue = "s";



//strictNullChecks: TRUE ono tsconfig.json
// someValue = null; ///ERROR!
// someValue = undefined; ///ERROR!

let someVal: number | string | null;
someVal = null;


// TYPE ASSERTIONS:
let value: any = 5;
let fixedString: string = (<number>value).toFixed(4); //Asserting is a number
let fixedString2: string = (value as number).toFixed(4); //Asserting is a number
console.log(fixedString); //5.0000
console.log(fixedString2);//5.0000


