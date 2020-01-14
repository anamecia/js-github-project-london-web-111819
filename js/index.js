document.addEventListener("DOMContentLoaded", function(){
 
    //global variables 

    const userSerchUrl = "https://api.github.com/search/users?q="
    const usersUrl = "https://api.github.com/users/"
    const searchForm = document.querySelector("#github-form")
    const userList = document.querySelector("#user-list")
    const repoList = document.querySelector("#repos-list")


    //request functions

    function get(url){
        return fetch(url,{
            headers:{
                "Content-Type": "application/json",
                "Accept": "application/vnd.github.v3+json"
            }
        })
        .then((response)=>response.json())
    }

    //functions

    function renderUsers(user){
        let li = document.createElement("li")
        let span = document.createElement("span")
        span.innerText = user.login
        span.addEventListener("click", () => showUserRepos(user.login))
        let link = document.createElement("link")
        link.innerHTML = `<p>URL:${user.url}<p>`
        link.href = user.url
        let img = document.createElement("img")
        img.src = user.avatar_url
        li.append(img,span)
        userList.append(li)
    }

    function renderRepos(repo){
        let li = document.createElement("li")
        let p = document.createElement("p")
        p.innerText = repo.name
        li.append(p)
        repoList.append(li)
    }
    

    function searchUser(e){
        e.preventDefault()
        userList.innerHTML = ""
        repoList.innerHTML = ""
        let username = e.target.search.value 
        let url = `${userSerchUrl}${username}`

        get(url)
        .then((json) => json.items.forEach(renderUsers))
        
        searchForm.reset()
    }

    function showUserRepos(username){
        repoList.innerHTML= ""
        let url = `${usersUrl}${username}/repos`
        get(url)
        .then((repos)=>repos.forEach(renderRepos))
    }

    //run functions and event listeners

    searchForm.addEventListener("submit", searchUser)
})