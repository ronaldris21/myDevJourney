// Assume Carla has a joinWifi function. Given the network name and the passcode (as a string),
// the function tries to join the network, returning a promise that resolves if successful and rejects
// if the authentication failed. The first thing she needs is a way to wrap a promise so that
// it automatically rejects after it takes too much time, to allow the program to quickly move on if the access point doesn’t respond.

function withTimeout(promise, time) {
  return new Promise((resolve, reject) => {
    promise.then(resolve, reject);
    setTimeout(() => reject("Time out!"), time);
  });
}

console.time("set");
setTimeout(() => {
  console.timeLog("set");
}, 2000);

console.timeLog("set", "After");

// Generators
// This ability of functions to be paused and then resumed again is not exclusive to async functions. JavaScript also has a feature called generator functions. These are similar, but without the promises.
console.log("Generators");
function* powers(n) {
  for (let current = n; ; current *= n) {
    yield current;
  }
}
console.log(powers(3));
for (let power of powers(3)) {
  if (power > 50) break;
  console.log(power);
}
// → 3
// → 9
// → 27

// An async function is a special type of generator. It produces a promise when called, which is resolved when it returns (finishes) and rejected when it throws an exception. Whenever it yields (awaits) a promise, the result of that promise (value or thrown exception) is the result of the await expression.

/////
////    EVENT LOOP
// But as events come in, they are added to a queue, and their code is executed one after the other.
// Because no two things run at the same time, slow-running code can delay the handling of other events.

///
let start = Date.now();
setTimeout(() => {
  console.log("Timeout ran at", Date.now() - start);
}, 20);
while (Date.now() < start + 50) {}
console.log("Wasted time until", Date.now() - start);
// → Wasted time until 50
// → Timeout ran at 55

//
Promise.resolve("Done").then(console.log);
console.log("Me first!");
// → Me first!
// → Done

///     BUILDING A PROMISE.ALL
console.log("BUILDING A PROMISE.ALL");

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    // Your code here.
  });
}

// Test code.
Promise_all([]).then((array) => {
  console.log("This should be []:", array);
});
function soon(val) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(val), Math.random() * 500);
  });
}
Promise_all([soon(1), soon(2), soon(3)]).then((array) => {
  console.log("This should be [1, 2, 3]:", array);
});
Promise_all([soon(1), Promise.reject("X"), soon(3)])
  .then((array) => {
    console.log("We should not get here");
  })
  .catch((error) => {
    if (error != "X") {
      console.log("Unexpected failure:", error);
    }
  });





  /// CALLBACKS
  window.addEventListener('load', () => {
    // window loaded
    // do what you want
  });
  















  
