///SAMPLE 1 THIS CHAINS EVERY
function sample1() {
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000); // (*)
  })
    .then(function (result) {
      // (**)

      alert(result); // 1
      return result * 2;
    })
    .then(function (result) {
      // (***)

      alert(result); // 2
      return result * 2;
    })
    .then(function (result) {
      alert(result); // 4
      return result * 2;
    });
}

function sample2() {
  new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  })
    .then(function (result) {
      alert(result); // 1

      return new Promise((resolve, reject) => {
        // (*)
        setTimeout(() => resolve(result * 2), 1000);
      });
    })
    .then(function (result) {
      // (**)

      alert(result); // 2

      return new Promise((resolve, reject) => {
        setTimeout(() => resolve(result * 2), 1000);
      });
    })
    .then(function (result) {
      alert(result); // 4
    });
}

function wrongPromisesChaining() {
  let promise = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(1), 1000);
  });

  //Each one is executed after the resolve of the promise.
  //That's why every function returns 1!

  promise.then(function (result) {
    alert(result); // 1
    return result * 2;
  });

  promise.then(function (result) {
    alert(result); // 1
    return result * 2;
  });

  promise.then(function (result) {
    alert(result); // 1
    return result * 2;
  });
}

function chainingPromisesAndKeepingVariables() {
  fetch(`https://api.github.com/users/ronaldris21`).then((user1) => {
    fetch(`https://api.github.com/users/ronaldris21`).then((user2) => {
      fetch(`https://api.github.com/users/ronaldris21`)
        .then((user3) => {
          // this function has access to variables script1, script2 and script3
          return Promise.all([user1.json(), user2.json(), user3.json()]);
        })
        .then((users) => {
          console.log(users);
        });
    });
  });
}

function betterGithubRequest() {
  function loadJson(url) {
    return fetch(url).then((response) => response.json());
  }

  function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
  }

  function showAvatar(githubUser) {
    return new Promise(function (resolve, reject) {
      let img = document.createElement("img");
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);

      setTimeout(() => {
        img.remove();
        resolve(githubUser);
      }, 3000);
    });
  }

  // Use them:
  loadGithubUser("ronaldris21")
    .then(showAvatar)
    .then((githubUser) => alert(`Finished showing ${githubUser.name}`));
}

betterGithubRequest();
