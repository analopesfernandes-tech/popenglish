/* pegar usuário do login */

const user = JSON.parse(localStorage.getItem("user"));

/* proteger página (muito importante) */

if(!user){
window.location.href = "login.html";
}

/* mostrar nome (apenas primeiro nome) */
if(user && user.nome){
    const primeiroNome = user.nome.split(" ")[0];
    boasVindas.innerText = `Welcome, ${primeiroNome} 👋`;
} else {
    boasVindas.innerText = "Welcome 👋";
}

/* logout */

document.getElementById("logout").addEventListener("click", () => {
localStorage.removeItem("user");
window.location.href = "login.html";
});