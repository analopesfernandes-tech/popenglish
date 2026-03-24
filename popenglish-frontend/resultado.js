const params = new URLSearchParams(window.location.search);

const score = params.get("score");
const nivel = params.get("nivel");

document.getElementById("pontuacao").textContent =
`Pontuação: ${score} / 12`;

document.getElementById("nivel").textContent =
`Nível estimado: ${nivel}`;


// 🔥 NOVO: mensagem motivadora
let mensagem = "";

if(nivel === "Básico"){
    mensagem = "Todo mundo começa do zero — você já deu o primeiro passo 👏 Continue e você vai evoluir rápido!";
}
else if(nivel === "Intermediário"){
    mensagem = "Você já consegue se comunicar! Agora é hora de ganhar fluidez 💪";
}
else if(nivel === "Avançado"){
    mensagem = "Seu inglês está forte! Vamos refinar e chegar na fluência 🔥";
}
else{
    mensagem = "Continue praticando todos os dias 🚀";
}

// 🔥 MOSTRAR NA TELA
document.getElementById("mensagem").textContent = mensagem;




