console.log("REGISTRO 🚀");
document.getElementById("form").addEventListener("submit", async function (e) {
    console.log("FORM ENVIADO");
    e.preventDefault();

    const data = {
        nomecompleto: document.getElementById("nomecompleto").value,
        genero: document.querySelector('input[name="genero"]:checked')?.value || '',
        cidade: document.getElementById("cidade").value,
        pais: document.getElementById("pais").value,
        email: document.getElementById("email").value
    };

    try {
        const response = await fetch("https://popenglish-production.up.railway.app/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data) // dados do formulário
        });

        const result = await response.json(); // resposta do backend

        const popup = document.getElementById("popupErro");
        const mensagem = document.getElementById("mensagemErro");

        if (!response.ok) {
            mensagem.innerText = result.message || "Erro ao cadastrar.";
            popup.classList.remove("hidden");
            return;
        }

        // sucesso
        mensagem.innerText = "Cadastro realizado com sucesso!";
        popup.classList.remove("hidden");

        document.getElementById("form").reset();

        mensagem.innerText = "Cadastro realizado! Redirecionando...";

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);

    } catch (err) {
        console.error(err);

        const popup = document.getElementById("popupErro");
        const mensagem = document.getElementById("mensagemErro");

        mensagem.innerText = "Erro ao conectar com o servidor.";
        popup.classList.remove("hidden");
    }
});

function fecharPopup() {
    document.getElementById("popupErro").classList.add("hidden");
}

// 👉 fechar clicando fora do popup
window.onclick = function (e) {
    const popup = document.getElementById("popupErro");
    if (e.target.id === "popupErro") {
        popup.classList.add("hidden");
    }
};