const params = new URLSearchParams(window.location.search);

const score = params.get("score");
const nivel = params.get("nivel");

document.getElementById("pontuacao").textContent =
`Pontuação: ${score} / 12`;

document.getElementById("nivel").textContent =
`Nível estimado: ${nivel}`;




