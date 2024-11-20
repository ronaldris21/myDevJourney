import setText, { appendText, showWaiting, hideWaiting } from "./results.mjs";

export function get() {
  axios.get("http://localhost:3000/orders/2").then(({ data }) => {
    setText(JSON.stringify(data));
  });
}

export function getCatch() {
  axios
    .get("http://localhost:3000/orders/52")
    .then((result) => {
      if (result.status === 200) {
        setText(JSON.stringify(result.data));
      } else {
        setText("Error: code: " + result.status);
      }
    })
    .catch((e) => {
      setText(e);
    });
}

export function chain() {
  ///Both ways works!
  //   axios
  //     .get("http://localhost:3000/orders/2")
  //     .then((result) => {
  //       return axios.get(
  //         "http://localhost:3000/addresses/" + result.data.shippingAddress
  //       );
  //     })
  //     .then((result) => {
  //       setText(JSON.stringify(result.data));
  //     });

  axios.get("http://localhost:3000/orders/2").then((result) => {
    axios
      .get("http://localhost:3000/addresses/" + result.data.shippingAddress)
      .then((result) => {
        setText(JSON.stringify(result.data));
      });
  });
}

export function chainCatch() {
  axios
    .get("http://localhost:3000/orders/2 ")
    .then((result) => {
      axios
        .get("http://localhost:3000/addresses/" + result.data.shippingAddress)

        .catch((e) => setText(e));
    })
    .then((result) => {
      setText(JSON.stringify(result.data.flavor)); //Do not exist
    })
    .catch((e) => setText(e));
}
export function final() {
  showWaiting();



  axios
    .get("http://localhost:3000/orders/2 ")
    .then((result) => {
      return axios
        .get("http://localhost:3000/addresses/" + result.data.shippingAddress)
        .catch((e) => setText(e));
    })
    .then((result) => {
      setText(JSON.stringify(result.data)); //Do not exist
    })
    .catch((e) => setText(e))
    .finally(() =>setTimeout(()=>hideWaiting(),500));

  // setTimeout(()=>hideWaiting(),2000);
}
