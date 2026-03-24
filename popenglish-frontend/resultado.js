const params = new URLSearchParams(window.location.search);

const score = params.get("score");
const nivel = params.get("nivel");

document.getElementById("pontuacao").textContent =
`Pontuação: ${score} / 12`;

document.getElementById("nivel").textContent =
`Nível estimado: ${nivel}`;


// 🔥 NOVO: mensagem motivadora 
let mensagem = "";

if(nivel === "A1"){
    mensagem = "Todo mundo começa do zero - você já deu o primeiro passo. 🚀 Em poucos dias você já verá evolução.";
}
else if(nivel === "A2"){
    mensagem = "Você já tem uma base! Agora é hora de ganhar confiança 💪";
}
else if(nivel === "B1"){
    mensagem = "Você já consegue se comunicar bem! Vamos melhorar a fluidez 🔥";
}
else if(nivel === "B2"){
    mensagem = "Seu inglês está forte! Agora é só lapidar para alcançar a fluência 🚀";
}
else{
    mensagem = "Continue praticando todos os dias 👏";
}

// 🔥 MOSTRAR NA TELA
document.getElementById("mensagem").textContent = mensagem;




