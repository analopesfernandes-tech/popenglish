/* =========================
   RESPOSTAS CORRETAS
========================= */

const respostasCorretas = [
    "am",
    "drinks",
    "do",
    "went",
    "are",
    "in",
    "would",
    "since",
    "leaving",
    "fluently",
    "had",
    "to"
];


/* =========================
   VERIFICAR SE É MODO REVISÃO
========================= */

const params = new URLSearchParams(window.location.search);
const modoRevisao = params.get("verRespostas") === "true";

const scoreResultado = params.get("score");
const nivelResultado = params.get("nivel");


/* =========================
   CARREGAR RESPOSTAS SALVAS
========================= */

function carregarRespostas() {

    const respostasSalvas =
        JSON.parse(localStorage.getItem("respostasQuiz"));

    if (!respostasSalvas) {
        console.log("Nenhuma resposta salva encontrada.");
        return;
    }

    for (let i = 1; i <= 12; i++) {

        const valor = respostasSalvas[`q${i}`];

        if (valor) {

            const input = document.querySelector(
                `input[name="q${i}"][value="${valor}"]`
            );

            if (input) {
                input.checked = true;
            }
        }
    }
}


/* =========================
   MOSTRAR RESULTADO DO QUIZ
========================= */

function verificarQuiz() {

    /* Se estamos no modo revisão,
       NÃO devemos executar esta função */

    if (modoRevisao) {
        return;
    }


    let pontuacao = 0;
    let respostasUsuario = {};


    /* =========================
       VERIFICAR CADA QUESTÃO
    ========================= */

    for (let i = 1; i <= 12; i++) {

        const selecionada =
            document.querySelector(
                `input[name="q${i}"]:checked`
            );

        const todas =
            document.querySelectorAll(
                `input[name="q${i}"]`
            );


        /* Salvar resposta do usuário */

        respostasUsuario[`q${i}`] =
            selecionada ? selecionada.value : null;


        /* Marcar resposta correta */

        todas.forEach(opcao => {

            if (opcao.value === respostasCorretas[i - 1]) {

                opcao.parentElement.classList.add("correto");

            }

        });


        /* Verificar acerto */

        if (selecionada) {

            if (
                selecionada.value ===
                respostasCorretas[i - 1]
            ) {

                pontuacao++;

            } else {

                selecionada.parentElement.classList.add("errado");

            }
        }
    }


    /* =========================
       SALVAR RESPOSTAS
    ========================= */

    localStorage.setItem(
        "respostasQuiz",
        JSON.stringify(respostasUsuario)
    );


    /* =========================
       BLOQUEAR ALTERAÇÕES
    ========================= */

    document
        .querySelectorAll("input")
        .forEach(input => {

            input.disabled = true;

        });


    /* =========================
       CALCULAR NÍVEL
    ========================= */

    let nivel;

    if (pontuacao <= 3) {

        nivel = "A1";

    } else if (pontuacao <= 6) {

        nivel = "A2";

    } else if (pontuacao <= 9) {

        nivel = "B1";

    } else {

        nivel = "B2";

    }


    /* =========================
       ABRIR RESULTADO
    ========================= */

    window.open(
        `resultado.html?score=${pontuacao}&nivel=${nivel}`,
        "_blank"
    );
}


/* =========================
   MODO REVISÃO
========================= */

function mostrarRespostas() {

    carregarRespostas();


    const respostasSalvas =
        JSON.parse(localStorage.getItem("respostasQuiz"));

    if (!respostasSalvas) {
        console.log("Nenhuma resposta encontrada.");
        return;
    }


    /* =========================
       MARCAR CORRETAS E ERRADAS
    ========================= */

    for (let i = 1; i <= 12; i++) {

        const valor =
            respostasSalvas[`q${i}`];

        const todas =
            document.querySelectorAll(
                `input[name="q${i}"]`
            );


        todas.forEach(opcao => {

            /* Resposta correta */

            if (
                opcao.value ===
                respostasCorretas[i - 1]
            ) {

                opcao.parentElement.classList.add("correto");

            }


            /* Resposta errada do usuário */

            if (
                valor &&
                opcao.value === valor &&
                valor !== respostasCorretas[i - 1]
            ) {

                opcao.parentElement.classList.add("errado");

            }

        });
    }


    /* =========================
       BLOQUEAR INPUTS
    ========================= */

    document
        .querySelectorAll("input")
        .forEach(input => {

            input.disabled = true;

        });
}


/* =========================
   QUANDO A PÁGINA CARREGAR
========================= */

window.addEventListener("DOMContentLoaded", function () {

    if (modoRevisao) {

        mostrarRespostas();

        const botaoResultado =
            document.getElementById("botaoResultado");

        if (botaoResultado && scoreResultado && nivelResultado) {

            botaoResultado.onclick = function () {

                window.location.href =
                    `resultado.html?score=${scoreResultado}&nivel=${nivelResultado}`;

            };

        }

    }

});
