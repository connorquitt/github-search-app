document.addEventListener("DOMContentLoaded", ()=>{
    const seachBar = document.querySelector("#search")
    document.querySelector("#submit-btn").addEventListener("click", ()=>{
        fetchName(seachBar.value)
        seachBar.value = ''
    })
    
})

//fetch functions
function fetchName(userName){
    event.preventDefault()
    const userContainer = document.querySelector("#user-list")
    const repoContainer = document.querySelector("#repos-list")
    fetch(`https://api.github.com/search/users?q=${userName}`)
        .then(res => res.json())
        .then(data => {
            userContainer.innerHTML = ''
            data.items.forEach((user)=>{
                const profileCard = document.createElement('li')
                profileCard.innerHTML = `
                    <h2 id='username'>${user.login}</h2>
                    <img src=${user.avatar_url}>
                    <a href=${user.html_url}>View Profile</a>
                `
                //profileLink.textContent = user.html_url
                userContainer.appendChild(profileCard)

                //put repos for user on page
                profileCard.addEventListener("click", ()=> {
                    repoContainer.innerHTML = ''
                    //console.log(profileCard.querySelector("#username").textContent)
                    fetch(`https://api.github.com/users/${profileCard.querySelector("#username").textContent}/repos`)
                        .then(res => res.json())
                        .then(data => {
                            data.forEach((repo) => {
                                const repoCard = document.createElement("li")
                                repoCard.innerHTML = `
                                    <h2>${repo.full_name}</h2>
                                    <a href=${repo.html_url}>Repo Link</a>
                                `
                                repoContainer.appendChild(repoCard)
                            })
                        })
                    
                })
                    

            })
            
                
        })        
}


    
