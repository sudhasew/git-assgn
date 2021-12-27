(function () {
  const lookupButton = document.getElementById("lookupButton");
  const usernameInput = document.getElementById("usernameInput");

  // listen to the lookup button(CREATING A FUNCTION)
  // call the loadUser function
  function listenToLookup() {
    lookupButton.addEventListener("click", (event) => {
      //console.log(event);
      loadUser(usernameInput.value);
    });
  }
  listenToLookup();
  // load the user from github
  //perform the fetch here
  //this should call createRepoElement for every item in the repos
  function loadUser(username) {
    //loading the user from the github using URL
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((user) => {
        //console.log(user);
        //then fetching the repos from URL
        fetch(user.repos_url)
          .then((response) => response.json())
          .then((repos) => {
            updateDOM(user, repos);
            //because of more repo_url we need to use for loop
            for (let i = 0; i < repos.length; i++) {
              console.log(repos[i]);
            }
          });
      });
  }

  // update the page
  // set the header(h2), show the repos
  // this should call createRepoElement for every item in the repos
  function updateDOM(user, repos) {
    const username = document.getElementById("username");
    username.innerText = user.name;
    const repositories = document.getElementById("repositories");
    for (let i = 0; i < repos.length; i++) {
      repositories.append(createRepoElement(repos[i]));
    }
  }

  // returns an <li> element
  function createRepoElement(repo) {
    //creating li element
    const li = document.createElement("li");
    //creating anchor element
    const a = document.createElement("a");
    //setting innertext to anchor
    a.innerText = repo.name;
    //set href attribute to repo parameter
    a.setAttribute("href", repo.html_url);
    //appending a to list
    li.append(a);
    return li;
  }
})();
