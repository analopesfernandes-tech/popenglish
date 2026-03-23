console.log("login.js carregado");

const form = document.getElementById("loginForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("email").value;
const mensagem = document.getElementById("mensagemLogin");

mensagem.innerHTML = "Entrando...";

try {

const response = await fetch("https://popenglish-production.up.railway.app/users/login", {

method: "POST",

headers: {
"Content-Type": "application/json"
},

body: JSON.stringify({ email })

});

const data = await response.json();

mensagem.innerHTML = data.message;

if(response.ok){

localStorage.setItem("user", JSON.stringify(data.user));

setTimeout(() => {
window.location.href = "dashboard.html";
}, 1000);

}

} catch (err){

mensagem.innerHTML = "Erro ao conectar com o servidor.";

}

});

}


/* =========================
MENU HAMBURGER
========================= */

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if(hamburger && navMenu){

hamburger.addEventListener("click", () => {
navMenu.classList.toggle("active");
});

/* fechar ao clicar no link */

document.querySelectorAll("#navMenu a").forEach(link => {
link.addEventListener("click", () => {
navMenu.classList.remove("active");
});
});

}
