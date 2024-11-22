
console.log("\n\n\nWonka")
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

// export type OmitBoolean =  

interface Hero {
    id: number;
    name: string;
    description: string;
    email: string;
    isAlive: boolean;
}


function funcHeroOmit() {
    console.log("funcHeroOmit");

    // CUSTOM HERO SAMPLE
    let hero: Hero = {
        id: 4,
        name: "Madelyn",
        description: "the cat whisperer",
        email: "madelyn@acme.com",
        isAlive: true
    };

    type OmitByType<T, U> = {
        [K in keyof T as T[K] extends U ? never : K]: T[K];
    };
    // Use the utility type to filter out boolean properties
    type OmitBoolean<T> = OmitByType<T, boolean>;

    let hero2: OmitBoolean<Hero> = {
        id: 4,
        name: "Madelyn",
        description: "the cat whisperer",
        email: "madelyn@acme.com",
        // isAlive: true
    };

    console.log("hero2");
    console.log(hero2);





    function printResult(h: OmitBoolean<Hero>) {
        console.log(h);
    }

}



// Add here your example
// funcHeroOmit();



function prueba2() {

    console.log("prueba2");
    interface Hero {
        id: number;
        name: string;
        description: string;
        email: string;
        isAlive: boolean;
    }



    // function getPropertyTypes(obj) {
    //     const result = {};

    //     // Iterate through each property in the object
    //     for (const key in obj) {
    //         if (Object.prototype.hasOwnProperty.call(obj, key)) {
    //             // Use `typeof` to get the type of each property
    //             result[key] = typeof obj[key];
    //         }
    //     }

    //     return result;
    // }

    type OmitByType<T, U> = {
        [K in keyof T as T[K] extends U ? never : K]: T[K];
    };
    // Use the utility type to filter out boolean properties
    type OmitBoolean<T> = OmitByType<T, boolean>;
    type OmitNumber<T> = OmitByType<T, number>;
    // Example usage
    const hero: Hero = {
        id: 1,
        name: "Arthur",
        description: "A brave knight",
        email: "arthur@roundtable.com",
        isAlive: true,
    };

    // const typesOfHero = checkTypes(hero);
    // console.log(["checkTypes typesOfHero", typesOfHero]);
    let hero2: OmitBoolean<Hero> = {
        id: 4,
        name: "Madelyn",
        description: "the cat whisperer",
        email: "madelyn@acme.com",
        // isAlive: true
    };


    let names = Object.getOwnPropertyNames(hero2)
    console.log(["names hero2", Object.getOwnPropertyNames(hero2)]);
    console.log(["names hero1", Object.getOwnPropertyNames(hero)]);
    console.log(["names hero1 as OmitBoolean", Object.getOwnPropertyNames(hero as OmitBoolean<Hero>)]);





    function printResult(h: OmitBoolean<Hero>) {
        console.log(["data", typeof h]);
        console.log(h);

    }

    printResult(hero2 as OmitBoolean<Hero>);


    let hero3 : OmitBoolean<Hero> = hero;
    console.log(hero3);


}


prueba2();

function pruebaTypeParams() {
    console.log("pruebaTypeParams");
    // A function that returns the keys of a given object type
    function getKeys<T>() {
        // This is purely type information; nothing happens at runtime
        type Keys = keyof T;
        return {} as Keys[]; // We can't actually retrieve keys at runtime, just type safety
    }

    // Usage with an example type
    type Person = {
        name: string;
        age: number;
        isEmployed: boolean;
    };

    // Call the function using `Person` type
    const personKeys = getKeys<Person>();
    console.log(personKeys);
}

// pruebaTypeParams();

function runTypeCheck() {
    console.log("\n\nrunTypeCheck()")
    // Define a sample type to work with
    type Type1 = {
        id: number;
        name: string;
        age: number;
    };

    // Define another type to compare against
    type Type2 = {
        id: number;
        name: string;
        city: string;
    };

    // A utility type to check if properties from Type1 exist in Type2
    type CheckProperties<T, U> = {
        [K in keyof T]: K extends keyof U ? true : false;
    };

    // Example usage of the utility type
    type Comparison = CheckProperties<Type1, Type2>;
    // Resulting type will be: { id: true; name: true; age: false; }

    // Function to check at runtime if properties from param1 exist in param2
    function checkPropertiesExist<T>(param1: T, param2: any): { [K in keyof T]: boolean } {
        const result: { [K in keyof T]: boolean } = {} as any;

        for (const key in param1) {
            if (Object.prototype.hasOwnProperty.call(param1, key)) {
                // Check if `param2` has the property `key`
                result[key] = key in param2;
            }
        }

        return result;
    }

    // Create a sample instance of Type1
    const type1Instance: Type1 = { id: 1, name: "John", age: 25 };
    // Create an object to compare with
    const param2Obj = { id: 10, name: "Alice" };

    // Execute the check
    const result = checkPropertiesExist(type1Instance, param2Obj);

    // Output the result to the console
    console.log('Comparison result:', result);
}

// Run the function to execute all the code at once
// runTypeCheck();



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

// If<(1%4==0),number, string> // THIS IS NOT POSSIBLE BECAUSE TYPESCRIPT IS COMPILE TIME, and the expression is runtime evaluate!

function exa2(){
    type If<C,T,F> = C extends true ? T : F;

    let number1 : If<false,string,number> = 4;
    let numb : If<true,string,number> = "4";
    // function checkSquereNumber ( cond:true ,  data: ){

    // }

}


// Add here your solution

// Add here your example

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

// Add here your example


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

type CustomReturnType<T> = T extends (...args: any) => infer R ? R : any;

Array.prototype.fill

// Add here your example

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

// Add here your example


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

// Add here your example