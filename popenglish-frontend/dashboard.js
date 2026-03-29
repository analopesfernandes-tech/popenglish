/* =========================
PEGAR USUÁRIO DO LOGIN
========================= */

const user = JSON.parse(localStorage.getItem("user"));

/* =========================
PROTEGER PÁGINA
========================= */

if (!user) {
    window.location.href = "login.html";
}

/* =========================
ELEMENTOS DO HTML
========================= */

const boasVindas = document.getElementById("boasVindas");
const nivelElemento = document.getElementById("nivel");

/* MOSTRAR NOME */

if (user && user.nome) {
    const primeiroNome = user.nome.split(" ")[0];
    boasVindas.innerText = `Welcome, ${primeiroNome} 👋`;
} else {
    boasVindas.innerText = "Welcome 👋";
}

/* NÍVEL DO USUÁRIO */

// por enquanto fixo (MVP)
const nivel = "A1";

nivelElemento.innerText = `Seu nível: ${nivel}`;


// botão começar lição
document.getElementById("startLesson").addEventListener("click", () => {
    window.location.href = "lesson1.html";
});

// botão fazer quiz
document.getElementById("startQuiz").addEventListener("click", () => {
    window.location.href = "quiz1.html";
});

/* LOGOUT */

document.getElementById("logout").addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "login.html";
});