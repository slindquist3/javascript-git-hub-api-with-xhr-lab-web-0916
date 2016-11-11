function getUsername() {
   return document.getElementById("username").value
 }

function getRepositories() {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories)
  req.open("GET", `https://api.github.com/users/${getUsername()}/repos`)
  req.send()
}


function displayRepositories(response) {
  const repos = JSON.parse(this.responseText)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + '<br> <a href="#" data-repo="' + r.name + '" onclick="getAllInfo(this)">More information</a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${getUsername()}/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.commit.committer.name + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("commits").innerHTML = commitsList
}

function getBranches(el) {
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${getUsername()}/${el.dataset.repo}/branches`)
  req.send()

}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong> - ' + branch.message + '</li>').join('')}</ul>`
  document.getElementById("branches").innerHTML = branchesList
}

function getAllInfo(el) {
  getBranches(el)
  getCommits(el)
}
