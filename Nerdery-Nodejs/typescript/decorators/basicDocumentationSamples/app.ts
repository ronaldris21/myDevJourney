import { BugReport } from "./src/BugReport";
import { ExampleClass } from "./src/ExampleClass";
import { Greeter } from "./src/Greeter";
import { Point } from "./src/Point";

console.log("\n\nSAMPLE 1:")
console.log("Example Class Example");
let clazz = new ExampleClass();
console.log(clazz);


console.log("\n\nSAMPLE 2:")
console.log("Example Class point");
let point = new Point(4, 5);
console.log(point);
console.log(point.x);
console.log(point.y);




console.log("\n\nSAMPLE 3:")
console.log("Example Class Greeter - Property decorators");
let greeter = new Greeter("Have a fucking nice day");
console.log("greeter.greet():", greeter.greet())
console.log("greeter.greeting:", greeter.greeting)



console.log("\n\nSAMPLE 4:")
console.log("Example Class BugReport  parameter required");
let bugReporter = new BugReport("Reporter");
console.log("bugReporter.print(true)", bugReporter.print(true))
console.log(" bugReporter.type", bugReporter.type)
console.log("bugReporter.title", bugReporter.title)
