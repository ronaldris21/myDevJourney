interface Hero {
    id: number;
    name: string;
    description: string;
    email: string;
    isAlive: boolean;
}
const hero: Hero = {
    id: 1,
    name: "Arthur",
    description: "A brave knight",
    email: "arthur@roundtable.com",
    isAlive: true,
};


/**
 * Exercise #1: Filter object properties by type.
 * 
 * Using a utility type `OmitByType`, this example demonstrates how to pick properties 
 * from a type `T` whose values are *not* assignable to a specified type `U`.
 * 
 * @example
 * type OmitBoolean = OmitByType<{
 *   name: string;
 *   count: number;
 *   isReadonly: boolean;
 *   isEnable: boolean;
 * }, boolean>; 
 * 
 * Resulting type:
 * 
 * { 
 * name: string; 
 * count: number; 
 * }
 */



// Add here your solution
type OmitByType<T, U> = {
    [K in keyof T as T[K] extends U ? never : K]: T[K];
};
type OmitBoolean<T> = OmitByType<T, boolean>;
type HeroOmitBoolean = OmitBoolean<Hero>;


// Add here your example
function testExercise1() {
    let hero2: HeroOmitBoolean = {
        id: 4,
        name: "Madelyn",
        description: "the cat whisperer",
        email: "madelyn@acme.com",
        // isAlive: true
    };


    let names = Object.getOwnPropertyNames(hero2)
    console.log("\ngetOwnPropertyNames");
    console.log(["hero", Object.getOwnPropertyNames(hero)]); // [ 'hero', [ 'id', 'name', 'description', 'email', 'isAlive' ] ]
    console.log(["hero as OmitBoolean", Object.getOwnPropertyNames(hero as OmitBoolean<Hero>)]); /// [ 'hero as OmitBolean', [ 'id', 'name', 'description', 'email', 'isAlive' ] ]
    console.log(["hero2", Object.getOwnPropertyNames(hero2)]); // [ 'hero2', [ 'id', 'name', 'description', 'email', 'isAlive' ] ]
    //As shown above, the utility types only helps like contracts for compiling errors.
    //On executiong, Javascript still copy the whole object.
    //A solution could be a caster function or a third party library   
    console.log();




    function printResult(h: HeroOmitBoolean) {
        console.log(["data", typeof h]);
        console.log(h);
    }

    printResult({
        description: hero.description,
        email: hero.email,
        id: hero.id,
        name: hero.name
        // isAlive:true ///ERROR: property does not exist in HeroOmitBoolean
    });


    let hero3: OmitBoolean<Hero> = hero;
    console.log(hero3);


    console.log("Reflect.ownKeys(hero)");
    console.log(Reflect.ownKeys(hero));
    console.log(Reflect.ownKeys(hero2));
    console.log(Reflect.ownKeys(hero3));

}
testExercise1();















/**
 * Exercise #2: Implement the utility type `If<C, T, F>`, which evaluates a condition `C`
 * and returns one of two possible types:
 * - `T` if `C` is `true`
 * - `F` if `C` is `false`
 *
 * @description
 * - `C` is expected to be either `true` or `false`.
 * - `T` and `F` can be any type.
 *
 * @example
 * type A = If<true, 'a', 'b'>;  // expected to be 'a'
 * type B = If<false, 'a', 'b'>; // expected to be 'b'
 */


// Add here your solution
type If<C, T, F> = C extends true ? T : F;

// Add here your example

function testExercise2() {
    console.log("testExercise2()");

    let number4: If<false, string, number> = 4;
    let text4: If<true, string, number> = "4";
    // text4 = 4;  // ERROR: Type 'number' is not assignable to type 'string'.ts(2322)
    // number4 = "as"; // ERROR: Type 'string' is not assignable to type 'number'.ts(2322)

    console.log([number4, text4]);
    // If<(1%4==0),number, string> // THIS IS NOT POSSIBLE BECAUSE TYPESCRIPT IS COMPILE TIME, and the expression is runtime evaluate!
}











/**
 * Exercise #3: Recreate the built-in `Readonly<T>` utility type without using it.
 *
 * @description
 * Constructs a type that makes all properties of `T` readonly.
 * This means the properties of the resulting type cannot be reassigned.
 *
 * @example
 * interface Todo {
 *   title: string;
 *   description: string;
 * }
 *
 * const todo: MyReadonly<Todo> = {
 *   title: "Hey",
 *   description: "foobar"
 * };
 *
 * todo.title = "Hello";       // Error: cannot reassign a readonly property
 * todo.description = "barFoo"; // Error: cannot reassign a readonly property
 */


// Add here your solution
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P];
};

// Add here your example
let heroReadonly: MyReadonly<Hero> = hero;
// heroReadonly.description = "asd"; //Error: cannot reassign a readonly property













/**
 * Exercise #4: Recreate the built-in `ReturnType<T>` utility type without using it.
 * 
 * @description
 * The `MyReturnType<T>` utility type extracts the return type of a function type `T`.
 * 
 * @example
 * const fn = (v: boolean) => {
 *   if (v) {
 *     return 1;
 *   } else {
 *     return 2;
 *   }
 * };
 * 
 * type a = MyReturnType<typeof fn>; // expected to be "1 | 2"
 */


// Add here your solution
type MyReturnType<T> = T extends (...args: any) => infer R ? R : any;
// (...args: any) => infer R    --- this represents the function!
// if it is a function, it return the type R from the function
// if not, it return any for the type




// Add here your example
function testExercise4() {
    console.log("testExercise4()");
    const fn = (v: boolean): number => {
        if (v) {
            return 1;
        } else {
            return 2;
        }
    };

    let result: MyReturnType<typeof fn> = fn(true);
    console.log(result); // 1 
    console.log(typeof result); // "number"

    // result = "number"; ///ERROR: Type 'string' is not assignable to type 'number'.ts(2322)

}

testExercise4();



















/**
 * Exercise #5: Extract the type inside a wrapped type like `Promise`.
 *
 * @description
 * Implement a utility type `MyAwaited<T>` that retrieves the type wrapped in a `Promise` or similar structure.
 *
 * If `T` is `Promise<ExampleType>`, the resulting type should be `ExampleType`.
 *
 * @example
 * type ExampleType = Promise<string>;
 *
 * type Result = MyAwaited<ExampleType>; // expected to be "string"
 */

// Add here your solution
// type MyAwaitedOneLeasdavel<T> =  




// SOLUTION 1
type MyAwaited<T> = T extends { then(onfulfilled: (value: infer R) => any): any } ? R : T;

// Add here your example

//Sample 1:
type heroPromise = MyAwaited<Promise<Hero>>
let hero5: heroPromise = {
    description: hero.description,
    email: hero.email,
    id: hero.id,
    name: hero.name,
    isAlive: true
};
console.log("testExercise5()");
console.log(typeof hero5); // object

type Example1 = MyAwaited<Promise<number>>;  // number
let n1: Example1 = 4;
type Example2 = MyAwaited<Promise<string>>;  // string
let n2: Example2 = "4";


//Nesting previous utility type
const getHeroAsync = (): Promise<Hero> => {
    return new Promise(resolve => resolve(hero));
};
type heroFn = MyAwaited<MyReturnType<typeof getHeroAsync>> //Mixing
let hero4: heroFn = {
    ...hero
}




//SOLUTION 2
type MyAwaitedOneLevelPromise<T> = T extends Promise<infer U> ? U : T;
type ExamplePromise1 = MyAwaitedOneLevelPromise<Promise<number>>;  // number
type ExamplePromise2 = MyAwaitedOneLevelPromise<Promise<string>>;  // string











/**
 * Exercise 6: Create a utility type `RequiredByKeys<T, K>` that makes specific keys of `T` required.
 *
 * @description
 * The type takes two arguments:
 * - `T`: The object type.
 * - `K`: A union of keys in `T` that should be made required.
 *
 * If `K` is not provided, the utility should behave like the built-in `Required<T>` type, making all properties required.
 *
 * @example
 * interface User {
 *   name?: string;
 *   age?: number;
 *   address?: string;
 * }
 *
 * type UserRequiredName = RequiredByKeys<User, 'name'>;
 * expected to be: { name: string; age?: number; address?: string }
 */

// Add here your solution

// type RequiredByKeys = Pick
// type RequiredByKeys<T, K extends keyof T> =
//     K extends null | undefined
//     ? Required<T>
//     :
//     Omit<T, K> & { [P in keyof T]?: T[P]; } /// This last one is the partial definition

// Required Partial
// Partial<T> & Required<K>
type RequiredByKeys<T, K extends keyof T = keyof T> =
    Omit<T, K> & { [P in K]-?: T[P] }

// Add here your example
interface User {
    name?: string;
    age?: number;
    address?: string;
}

//Only age becomes required
type UserRequiredAge = RequiredByKeys<User, "age">;
let userWithName: UserRequiredAge = {
    age: 21
}

//Al properties become required:
type UserRequired = RequiredByKeys<User>;
let userFull: UserRequired = {
    address: "ads",
    age: 32,
    name: "ad"
}





console.log("////CUSTOM SAMPLES:");

const user = {
    name: "Alice", age: 25,
    [Symbol('id')]: 123,

};
console.log(user);
// Delete a property
Reflect.deleteProperty(user, 'age');
console.log(user);  // Output: { name: 'Alice' }

// Get all property keys including Symbols
console.log(Reflect.ownKeys(user));  // Output: ['name', Symbol(id)]
