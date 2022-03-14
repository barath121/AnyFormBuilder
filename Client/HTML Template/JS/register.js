let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("password")
let confirmpassword = document.getElementById("confirmpassword")
let registerbutton = document.getElementById("registerbutton")
const server_url = "http://localhost:3000/user"
const register = async () => {
    try {
        let body = {
            username : username.value,
            email : email.value,
            password : password.value
        }
        const result  = await fetch(`${server_url}/register`,{
            method : "POST",
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(body)
        })
        
        console.log(result);
    } catch (error) {
        console.log(error)
    }
    
    // window.location.replace("/Client/dashboard.html");
}
registerbutton.addEventListener("click",register);
