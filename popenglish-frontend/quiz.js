/* =========================
CARREGAR RESPOSTAS SALVAS
========================= */

function carregarRespostas(){

let respostasSalvas = JSON.parse(localStorage.getItem("respostasQuiz"));

if(!respostasSalvas) return;

for(let i=1;i<=12;i++){

let valor = respostasSalvas[`q${i}`];

if(valor){
let input = document.querySelector(`input[name="q${i}"][value="${valor}"]`);
if(input) input.checked = true;
}

}

}


/* =========================
VERIFICAR QUIZ
========================= */

function verificarQuiz(){

let respostasCorretas = [
"am","drinks","do","went","are","in",
"would","since","leaving","fluently","had","to"
];

let pontuacao = 0;

/* SALVAR RESPOSTAS */

let respostasUsuario = {};

for(let i=1;i<=12;i++){

let selecionada = document.querySelector(`input[name="q${i}"]:checked`);
let todas = document.querySelectorAll(`input[name="q${i}"]`);

/* salvar resposta */
respostasUsuario[`q${i}`] = selecionada ? selecionada.value : null;

/* marcar correta */
todas.forEach(opcao => {

if(opcao.value === respostasCorretas[i-1]){
opcao.parentElement.classList.add("correto");
}

});

/* verificar erro/acerto */

if(selecionada){

if(selecionada.value === respostasCorretas[i-1]){
pontuacao++;
}else{
selecionada.parentElement.classList.add("errado");
}

}

}

/* salvar no navegador */

localStorage.setItem("respostasQuiz", JSON.stringify(respostasUsuario));

/* bloquear alteração */

document.querySelectorAll("input").forEach(input=>{
input.disabled = true;
});

/* calcular nível */

let nivel;

if(pontuacao <=3){
nivel="A1";
}
else if(pontuacao <=6){
nivel="A2";
}
else if(pontuacao <=9){
nivel="B1";
}
else{
nivel="B2";
}

/* só abre resultado se NÃO for modo revisão */

if(!window.location.search.includes("verRespostas")){
window.open(`resultado.html?score=${pontuacao}&nivel=${nivel}`, "_blank");
}

}


/* =========================
VERIFICAR SE É MODO RESPOSTAS
========================= */

window.onload = function(){

const params = new URLSearchParams(window.location.search);

if(params.get("verRespostas") === "true"){

carregarRespostas();   // preenche respostas
verificarQuiz();       // mostra ✔ e ✖

}

};
