import setText, { appendText, hideWaiting, showWaiting } from "./results.mjs";

export function timeout() {
  setText("Waiting!");
  const wait = new Promise((resolve) => {
    setTimeout(() => {
      resolve("Timeout!!!!!");
    }, 1500);
  });

  wait.then((text) => setText(text));
}

export function interval() {
  setText("Waiting!");
  let counter = 0;
  const wait = new Promise((resolve) => {
    setInterval(() => {
      console.log("Interval");
      resolve(`Timeout ${++counter} times!!!!!`);
    }, 1000);
  });

  wait
    .then((text) => setText(text))
    .finally(() => appendText(` -- Done ${counter}`));
}

export function clearIntervalChain() {
  setText("Waiting!");
  let counter = 0;
  let interval;
  const wait = new Promise((resolve) => {
    interval = setInterval(() => {
      console.log("Interval");
      resolve(`Timeout ${++counter} times!!!!!`);
    }, 1000);
  });

  wait.then((text) => setText(text)).finally(() => clearInterval(interval));
}

export function xhr() {
  let request = new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:3000/users/2"); // 4 NOT FOUND
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.responseText);
      } else {
        reject(xhr.statusText);
      }
    };
    xhr.send();
  });

  request.then((result) => setText(result)).catch((reason) => setText(reason));
}

export function allPromises() {
  let categories = axios.get("http://localhost:3000/itemCategories");
  let statuses = axios.get("http://localhost:3000/orderStatuses");
  let userTypes = axios.get("http://localhost:3000/userTypes");
  let addressTypes = axios.get("http://localhost:3000/addressTypes");

  Promise.all([categories, statuses, userTypes, addressTypes])
    .then(
      //All fulfilled!
      ([
        categoriesResult,
        statusesResult,
        userTypesResult,
        addressTypesResult,
      ]) => {
        setText("");
        appendText(JSON.stringify(categoriesResult.data));
        appendText(JSON.stringify(statusesResult.data));
        appendText(JSON.stringify(userTypesResult.data));
        appendText(JSON.stringify(addressTypesResult.data)); //Error:
      }
    )
    .catch((e) => {
      //One is rejected!!
      setText(e);
    });
}

export function allSettled() {
  let categories = axios.get("http://localhost:3000/itemCategories");
  let statuses = axios.get("http://localhost:3000/orderStatuses");
  let userTypes = axios.get("http://localhost:3000/userTypes");
  let addressTypes = axios.get("http://localhost:3000/addressTypes");

  //   Promise.allSettled
  /**
   * Returns an object:
   *      resolved: {status: "fulfilled", value:{}}
   *      rejected: {status: "rejected", reason: {}}
   *
   */

  Promise.allSettled([categories, statuses, userTypes, addressTypes])
    .then(
      //All fulfilled!
      (responseArray) => {
        setText("");

        let results = responseArray.map((res) => {
          if (res.status === "fulfilled")
            return `FULLFILLED: ${JSON.stringify(res.value)} \n\n\n`;
          return `REJECTED: ${JSON.stringify(res.reason)} \n\n\n`;
        });

        setText(results);
      }
    )
    .catch((e) => {
      setText(e);
    });
}

//   Promise.race           --- FASTEST RESPONSE!!  even if error! so careful
export function race() {
  let users = axios.get("http://localhost:3000/users");
  let backup = axios.get("http://localhost:3000/usersasdad");

  //   ///GET THE FASTEST
  //   Promise.race([users, backup]).then((usersResult) =>
  //     setText(JSON.stringify(usersResult.data))
  //   );

  /// First successful
  Promise.any([users, backup]).then((usersResult) =>
    setText(JSON.stringify(usersResult.data))
  );
}

