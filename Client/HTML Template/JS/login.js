const server_url = "http://localhost:3000/user"

const login = async () => {
    let password = document.getElementById("password")
    let username = document.getElementById("username")
  
    try {
        let body = {
            username : username.value,
            password : password.value
        }
        const result  = await fetch(`${server_url}/login`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        let userData = await result.json();
        console.log(userData.token)        
    } catch (error) {
        console.log(error)
    }
    // window.location.replace("/Client/dashboard.html");
}
let loginbtn = document.getElementById("loginbtn")
loginbtn.addEventListener("click",login);
