function clonerRis(item) {
  ///I have to be carefull with arrays and object

  if (typeof item !== "object") return item;

  if (Array.isArray(item)) return item.map(clonerRis);

  //it's an object
  return (
    Object.entries(item).reduce((copyObject, [key, value]) => {
      copyObject[key] = clonerRis(value);
      return copyObject;
    }, {}) 
  ); ///TEST THIS LAST PART
}

// https://chatgpt.com/c/6733761c-dfdc-8000-8afc-0b6d4e2cc84c Source chat
function clonerRis(item) {
  // Handle non-object types (primitives, functions, etc.)
  if (typeof item !== "object" || item === null) return item;

  // Handle Date
  if (item instanceof Date) return new Date(item.getTime());

  // Handle RegExp
  if (item instanceof RegExp) return new RegExp(item.source, item.flags);

  // Handle Array
  if (Array.isArray(item)) return item.map(clonerRis);

  // Handle Map
  if (item instanceof Map) {
    const mapCopy = new Map();
    item.forEach((value, key) => {
      mapCopy.set(clonerRis(key), clonerRis(value));
    });
    return mapCopy;
  }

  // Handle Set
  if (item instanceof Set) {
    const setCopy = new Set();
    item.forEach((value) => {
      setCopy.add(clonerRis(value));
    });
    return setCopy;
  }

  // Handle plain object
  if (item.constructor === Object) {
    return Object.entries(item).reduce((copyObject, [key, value]) => {
      copyObject[key] = clonerRis(value);
      return copyObject;
    }, {});
  }

  // If none of the above, return the item as-is (not clonable, e.g., functions)
  return item;
}

///Higher-order function sample

function Calculator() {
  this.operation = {};

  this.calculate = function (text) {
    let [a, operator, b] = text.split(" ");
    return this.operation[operator](a, b);
  };

  this.addMethod = function (operator, func) {
    this.operation[operator] = func;
  };
}

let calc = new Calculator();
calc.addMethod("+", (a, b) => a + b);
calc.addMethod("*", (a, b) => a * b);
calc.addMethod("/", (a, b) => a / b);
calc.addMethod("-", (a, b) => a - b);

console.log(calc.calculate("4 + 7")); //11

//// pass variables by value
let five = 5;
function addOne(number) {
  number += 1;
}
addOne(five);
console.log(five); // 5

//// pass variables by reference
let speeds = [65, 58, 5, 90]; // max spedd

function addSpeedItem(newSpeed) {
  speeds.push(newSpeed);
}
addSpeedItem(4);
console.log(speeds); // [65, 58, 5, 90, 4]

/// Imagine you want to apply a 10% discount on each element:
let items = [
  {
    name: "aguacate",
    price: 1.0,
  },
  {
    name: "mani",
    price: 0.25,
  },
];

console.log(
  items.map((item) => {
    return {
      name: item.name,
      price: item.price * 0.9,
    };
  })
);



let ladder = {
    step: 0,
    up() {
      this.step++;
      return this;
    },
    down() {
      this.step--;
      return this;
    },
    showStep() {
      alert(this.step);
      return this.steps;
    },
    extra:{
        numbers:[4,2]
        }
  };
  
  
  let ladder2 = {...ladder}
  
  ladder2.up();
  console.log(ladder.step, ladder2.step) // 0 1
  
  
  

