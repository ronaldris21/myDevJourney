// class Person {
//   constructor(name, birthYear) {
//     this.name = name;
//     this._birthYear = birthYear;
//   }

//   set birthYear(year)
//   {
//     if(!isNaN(year)){
//         this._birthYear = year;
//     }
//   }

//   calcAge() {
//     return new Date().getFullYear() - this._birthYear;
//   }

//   static hey(){
//     console.log("Hey ✌️!")
//   }
// }

// let ronald = new Person("Ronald", "1999");
// console.log(ronald);

// //   /// Carefull with:

// //   1. Classes are NOT hoisted
// //   2. Classes are executed in strict-mode

// // inheritance;
// const Student = function(name, birthYear, course){
//     Person.call(this, name, birthYear);
//     this.course = course
// }

// //link the prototypes
// Student.prototype = Object.create(Person.prototype)  //This allows me to use method on the prototype on Person

// // let risStudent = new Student("Ronald", 1999, "Photography");
// // console.log(risStudent.calcAge()); //This works because it inherits the prototype method on Person

// // console.log(risStudent instanceof Student); //true
// // console.log(risStudent instanceof Person); // true
// // console.log(risStudent instanceof Object); // true

// class Account{

//   //private property; WORKS ON 95.08% OF global users: https://caniuse.com/mdn-javascript_classes_private_class_fields
//   #pin;  //same wiwh methods

//   constructor(name, currency, pin){
//     this.name = name;
//     this.currency = currency;
//     this.#pin = pin;
//   }

// }

// let sampleAccount =  new Account("Ronald Ris", "USD", 1234);
// console.log(sampleAccount);

// //// ENCAPSULATION AND DATA PRIVACY

// // Js implements a "Fake encapsulation". It's only a convention format for devs using "_" to know those properties are protected.
// // True protected works, but not approved yet and doesnt work on all browsers.

// ///Public fields
// ///Private fields

// ///Public method
// ///Private methods

function clonerRis(item) {
  ///I have to be carefull with arrays and object

  if (typeof item !== "object") return item;

  if (Array.isArray(item)) return item.map(clonerRis);

  //it's an object
  return Object.entries(item).reduce((copyObject, [key, value]) => {
    copyObject[key] = clonerRis(value);
    return copyObject;
  }, {});
}

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
  extra: {
    numbers: [4, 2],
  },
  numbersLvl1: [8, 9],
};

let ladder2 = clonerRis(ladder);

ladder2.up().up(); /// IT WONT WORK, it doesnt pass its functions
console.log(ladder.step, ladder2.step); // 0 2   -- Immutable

ladder2.extra.numbers.push(4);
console.log(ladder.extra.numbers); //[4, 2]      -- Immutable
console.log(ladder2.extra.numbers); //[4, 2, 4]

ladder2.numbersLvl1.push(10);
console.log(ladder.numbersLvl1); //[8,9]     -- Immutable
console.log(ladder2.numbersLvl1); //[8,9,10]

// // EMPLOYEE
// const Employee =  function(name, birthYear, pin){ /// important to start with capital letter (P in this case )
//   this.name = name;
//   this.birthYear = birthYear
//   this._pin = pin; //fake private standard
// }
// Employee.prototype.calcAge = function(){
//   return (new Date()).getFullYear() - this.birthYear;
// }

// // OFFICE MANAGER
// const OfficeManager = function (name, birthYear, pin, inChargeOf) {
//   Employee.call(this, name, birthYear, pin); //call father constructor
//   this.inChargeOf = inChargeOf;
// };

// //inheritance:
// OfficeManager.prototype = Object.create(Employee.prototype);

// let liz = new OfficeManager("liz", 1997, "1519", "US Headquarter");
// console.log(liz instanceof Employee); //false
// console.log(liz instanceof OfficeManager); //true
// console.log(liz.calcAge()) // 27
// console.log(liz.inChargeOf) // US Headquarter

// EMPLOYEE
const Employee = function (name, birthYear, pin) {
  /// important to start with capital letter (P in this case )
  this.name = name;
  this.birthYear = birthYear;
  this._pin = pin; //fake private standard
};
Employee.prototype.login = function (pin) {
  return pin === this.pin;
};

// OFFICE MANAGER
const OfficeManager = function (name, birthYear, pin, inChargeOf) {
  Employee.call(this, name, birthYear, pin); //call father constructor
  this.inChargeOf = inChargeOf;
};

//inheritance:
OfficeManager.prototype = Object.create(Employee.prototype);
OfficeManager.prototype.login = () => {
  return true;
};

let liz = new OfficeManager("liz", 1997, "1519", "US Headquarter");
let kai = new Employee("kai", 1999, "2525", "NodeJs");

console.log(liz.login("adsa")); // true even if wrong pin because it's a OfficeManager
console.log(kai.login("adsa")); //false because wrong ping for Employee
