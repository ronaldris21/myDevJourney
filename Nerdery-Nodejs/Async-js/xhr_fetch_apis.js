async function fetchUsers(endpoint) {
  const res = await fetch(endpoint);
  let data = await res.json();

  console.log(["fetchUsers():", data]);
  data = data.map((user) => user.name);
  console.log(["fetchUsers() mapped:", data]);
}

fetchUsers("https://jsonplaceholder.typicode.com/users");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((data) => console.log(["fetchSolito", data]))
  .catch((error) => console.error("Error:", error));

///XHR:

const request = new XMLHttpRequest();
request.open("GET", "https://jsonplaceholder.typicode.com/users");

request.send();
request.addEventListener("load", ()=>{
    console.log(["XMLHttpRequest", JSON.parse(request.responseText)]);
})
