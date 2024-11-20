// https://dmitripavlutin.com/what-is-javascript-promise/

console.log("FILE: PromisesOnJs");

setTimeout(() => {
  console.log("after ");
}, 0);

console.log("before ");

/// CALLBACK APPROACH:
function getList(callback) {
  setTimeout(() => callback(["joker", "batman"]), 1000);
}

function findPerson(name) {
  getList((list) => {
    const found = list.some((person) => person === name);

    console.log(name + (found ? " Found!!" : " Not found :("));
  });
}

findPerson("kai"); //Not found :(
findPerson("joker"); // found!

/// PROMISES APPROACH:

function getListAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(["joker", "batman"]), 1500);
  });
}
function findPerson2(name) {
  getListAsync().then((list) => {
    const found = list.some((person) => person === name);
    console.log(
      "Getting person using promises: " +
        name +
        (found ? " Found!!" : " Not found :(")
    );
  });
}

findPerson2("Kai");
findPerson2("batman");

////Handle errors:
function getList3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Nobody here :c")), 3000);
  });
}

const promiseError = getList3();

promiseError
  .then((value) => {
    console.log(value); // Skipped...
  })
  .catch((error) => {
    console.log(error); // logs Error('Nobody here!')
  });

//CHAIN OF PROMISES:

function delayedDouble(number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(number * 2), 1000);
  });
}

delayedDouble(5)
  .then((value1) => {
    console.log(value1);
    return delayedDouble(value1);
  })
  .then((value2) => {
    console.log(value2);
    // return delayedDouble(value2);
    return new Promise((resolve, reject) => reject(new Error("oops!")));
  })
  .then((value3) => {
    console.log(value3);
    return delayedDouble(value3);
  })
  .catch((error) => {
    console.log(error);
  });

// ASYNC AWAIT solution
async function runDelayedDoubleThrice(number) {
  let val = await delayedDouble(number);
  console.log(val);
  val = await delayedDouble(val);
  console.log(val);
  val = await delayedDouble(val);
  console.log(val);
}

runDelayedDoubleThrice(8);

/// PROMISES METHODS:

///You can check more samples about it on the "creating.mjs" file

/**
 *  PROMISE.ALL
 *          Wait to all promises to be FULFILLED, if one fails, everything does
 * 
 *  PROMISE.ALLSETTLED
 *          Wait to all promises to be resolved or rejected.
 *                  Validate "status" property in order to check whether it was "fulfilled" or "rejected"
 *          statusesPromise.then(statuses => {
                statuses; // [{ status: '...', value: '...' }, ...]
            });
 * 
 *  PROMISE.ANY
 *          Wait until the first promise is being resolve
 * 
 *  PROMISE.ANY
 *          Wait till the first promise is either resolve or rejected. It doesn't care whether it fails or not.
 *     
 */

// https://dmitripavlutin.com/promise-all-settled/
//SAMPLES ABOUT PROMISE.ALLSETTLED
function resolveTimeout(value, delay) {
  return new Promise((resolve) => setTimeout(() => resolve(value), delay));
}
function rejectTimeout(reason, delay) {
  return new Promise((r, reject) => setTimeout(() => reject(reason), delay));
}
async function runFunction() {
  const a = rejectTimeout(new Error("Out of vegetables!"), 1000);
  const b = rejectTimeout(new Error("Out of fruits!"), 1000);
  const statusesPromise = Promise.allSettled([a, b]);

  // wait...
  const [aResult, bResult] = await statusesPromise;
  console.log(["aResult", aResult]);
  //   console.log("bResult" + bResult);
  console.log(["bResult", bResult]);
}

runFunction();

async function runFuction2() {
  const statusesPromise = Promise.allSettled([
    rejectTimeout(new Error("Out of vegetables!"), 1000),
    rejectTimeout(new Error("Out of fruits!"), 1000),
  ]);

  // wait...
  const statuses = await statusesPromise;

  // after 1 second
  console.log(["statuses: runFuction2", statuses]);
  // [
  //   { status: 'rejected', reason: Error('Out of vegetables!')  },
  //   { status: 'rejected', reason: Error('Out of fruits!') }
  // ]
}

runFuction2();

// When being wrapped into try { ... }, the nearby catch(error) { ... } catches the rejected promise only if the promise is awaited (which is true for return await promise).

let urls = [
  "https://api.github.com/users/iliakan",
  "https://api.github.com/users/remy",
  "https://api.github.com/users/jeresig",
];

// map every url to the promise of the fetch
let requests = urls.map((url) => fetch(url));

// Promise.all waits until all jobs are resolved
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`PROMISE.ALL => ${response.url}: ${response.status}`)
  )
);

let names = ["iliakan", "remy", "jeresig"];

let githubRequests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(githubRequests)
  .then((responses) => {
    // all responses are resolved successfully
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`); // shows 200 for every url
    }

    return responses;
  })
  // map array of responses into an array of response.json() to read their content
  .then((responses) => Promise.all(responses.map((r) => r.json())))
  // all JSON answers are parsed: "users" is the array of them
  .then((users) =>
    users.forEach((user) => console.log(["Github Request:", user.name]))
  );

/// ACCEPTS OTHER TYPE OF OBJECTS!
Promise.all([
  "MULTIPLE OBJECTS",
  new Promise((resolve, reject) => {
    setTimeout(() => resolve(1), 5000);
  }),
  2,
  3,
]).then(alert); // 1, 2, 3
