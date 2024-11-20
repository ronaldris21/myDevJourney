class Animal {
    move() {
        console.log("Moving along!");
    }
}

class Dog extends Animal {
    woof(times: number) {
        for (let i = 0; i < times; i++) {
            console.log("woof!");
        }
    }
}

const d = new Dog();
// Base class method
d.move();
// Derived class method
d.woof(3);







///CUSTOMER CLASS
export class Customer {
    static year24: number = 2024;
    private name: string;
    isActive: boolean;
    #pin: string; //Private variable

    constructor(name: string, pin: string) {
        this.name = name;
        this.isActive = true;
        this.#pin = pin;
    }

    get getPin(): string {
        return this.#pin;
    }
    set pin(newPin: string) {
        this.#pin = newPin;
    }

    announce() {
        return "Hello , NAMAE WA " + this.name + " DES!";
    }
}

let ris = new Customer("Ronald", "xdxd");
console.log(ris);
console.log(ris.getPin);
console.log(ris.announce());
console.log(Customer.year24);


//EXTENSION
export class CustomerAdmin extends Customer {
    headOfDeparment: string;

    constructor(name: string, pin: string, headOfDeparment: string) {
        super(name, pin);
        this.headOfDeparment = headOfDeparment;
    }

    // announce() {
    // return "Hello , NAMAE WA " + this.name + " DES!"; //name is private
    // }
}






//// BEST WAY TO CREATE CLASS AND CONSTRUCTORS!!!!!

class Game {
    //public, private, protected, readonly 
    constructor(public date: Date, private score: number, public player: Customer) {
    }
}

let game = new Game(new Date(), 4, ris);
console.log(game);



class Point {
    x: number = 0;
    y: number = 0;

    // Constructor overloads
    constructor(x: number, y: number);
    constructor(xy: string);
    constructor(x: string | number, y: number = 0) {
        // Code logic here
    }
    scale(n: number): void {
        this.x *= n;
        this.y *= n;
    }
}


console.log(new Point("24"))



// Index Signatures

class MyClass {
    [s: string]: boolean | ((s: string) => boolean);

    check(s: string) {
        return this[s] as boolean;
    }
}

let classly = new MyClass();
console.log(classly);
console.log(classly.check("xdd"));



interface A {
    x: number;
    y?: number;
}
class C implements A {
    x = 0;
}
const c = new C();
//   c.y = 10; // Error, property y does not exist on type C



// PROTECTED:
class Greeter {
    public greet() {
        console.log("Hello, " + this.getName());
    }
    protected getName() {
        return "hi";
    }
}

class SpecialGreeter extends Greeter {
    public howdy() {
        // OK to access protected member here
        console.log("Howdy, " + this.getName());
    }
}
const g = new SpecialGreeter();
g.greet(); // OK
// g.getName(); // error, only accessible within class



class MySafe {
    private secretKey = 12345;
}

// In a JavaScript file...
const s = new MySafe();
// Will print 12345
// console.log(s.secretKey);



