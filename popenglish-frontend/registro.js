console.log("REGISTRO 🚀");
document.getElementById("form").addEventListener("submit", async function(e){
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
            body: JSON.stringify(data)
        });

        const mensagem = await response.text();
        alert(mensagem);

        document.getElementById("form").reset();

    } catch (err) {
        console.error(err);
        alert("Ocorreu um erro ao cadastrar.");
    }
});
