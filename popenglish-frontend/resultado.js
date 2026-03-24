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
    mensagem = "Todo mundo começa do zero. Em poucos dias de prática você já verá evolução  🚀 ";
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

//Barra de nível

const barra = document.getElementById("barra");

let porcentagem = (score / 12) * 100;

setTimeout(() => {
  barra.style.width = porcentagem + "%";
}, 200);

// 🎨 cor por nível
if(nivel === "A1"){
  barra.style.background = "#f01818ff";
}
else if(nivel === "A2"){
  barra.style.background = "#ffc400ff";
}
else if(nivel === "B1"){
  barra.style.background = "#ffe100ff";
}
else{
  barra.style.background = "#1adc20ff";
}




