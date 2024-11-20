function scaryClown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("🤡");
    }, 2000);
  });
}

async function msg() {
  const msg = await scaryClown();
  console.log("Message:", msg);
}

msg(); // Message: 🤡 <-- after 2 seconds

// PERSONAL SAMPLE
/// ASYNC -> FUNCTION WITH TIMER
function getRequestWithTimeOut(url, miliseconds) {
  return new Promise((resolve, reject) => {
    // Timeout condition
    setTimeout(() => reject("TimeOut!"), miliseconds);
    //request
    fetch(url).then((res) => {
      if (res.ok) {
        resolve(res.json());
        return;
      }
      console.log("failed res:");
      console.log(res);

      reject(res.statusText);
    });
  });
}

async function requestUsersWithTimer(miliseconds) {
  try {
    let result = await getRequestWithTimeOut(
      "https://jsonplaceholder.typicode.com/users/4",
      miliseconds
    );
    console.log("result");
    console.log(result);
  } catch (errorMessage) {
    console.log("ERROR on Async function: " + errorMessage);
  }
}

requestUsersWithTimer(10000);

///     INTERNET SAMPLE:

function who() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("😶‍🌫️");
    }, 200);
  });
}

function what() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("lurks");
    }, 300);
  });
}

function where() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("in the shadows");
    }, 500);
  });
}

async function msg() {
  const a = await who();
  const b = await what();
  const c = await where();

  console.log(`${a} ${b} ${c}`);
}

async function msg() {
  const [a, b, c] = await Promise.all([who(), what(), where()]);
  console.log(`${a} ${b} ${c}`);
}

msg(); // 😶‍🌫️ lurks in the shadows <-- after 1 second

////Promise returning:
const whoPromise = who();
console.log(["whoPromise", whoPromise]);

setTimeout(
  async () =>
    console.log([
      "Who promise result after 2.5s, but already finished from before: ",
      await whoPromise,
    ]),
  2500
);

///Promise value keeps being stored for being accessed later!
whoPromise.then((x) => console.log(x));
whoPromise.then((x) => console.log(x));
whoPromise.then((x) => console.log(x));

/////ERROR HANDLING:
function yayOrNay() {
  return new Promise((resolve, reject) => {
    const val = Math.round(Math.random() * 1); // 0 or 1, at random

    val ? resolve("Lucky!!") : reject("Nope 😠");
  });
}

async function msg() {
  try {
    const msg = await yayOrNay();
    console.log(msg);
  } catch (err) {
    console.log(err);
  }
}

msg(); // Lucky!!
msg(); // Lucky!!
msg(); // Lucky!!
msg(); // Nope 😠
msg(); // Lucky!!
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Nope 😠
msg(); // Lucky!!

///Leaving this may leave an uncaught error due to missing try catch on this block below
async function msg() {
  const msg = await yayOrNay();
  console.log(msg);
}

msg().catch((x) => console.log(x));

///Make it failed on purpose:
function caserUpper(val) {
  return new Promise((resolve, reject) => {
    resolve(val.toUpperCase());
  });
}

async function msg(x) {
  try {
    const msg = await caserUpper(x);
    console.log(msg);
  } catch (err) {
    console.log("Ohh no:", err.message);
  }
}

msg("Hello"); // HELLO
//   msg(34); // Ohh no: val.toUpperCase is not a function

////    FETCHING DATA FROM ENDPOINTS:

async function fetchUsers(endpoint) {
  const res = await fetch(endpoint);
  let data = await res.json();

  console.log(["fetchUsers():", data]);
  data = data.map(user=> user.name);
  console.log(["fetchUsers() mapped:", data]);
}

fetchUsers('https://jsonplaceholder.typicode.com/users');






fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())
  .then(data => console.log(["fetchSolito", data]))
  .catch(error => console.error('Error:', error));