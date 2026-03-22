document.getElementById("form").addEventListener("submit", async function(e){
    console.log("FORM ENVIADO");
    e.preventDefault();

    // Captura os valores
    const data = {
        nomecompleto: document.getElementById("nomecompleto").value,
        genero: document.querySelector('input[name="genero"]:checked')?.value || '',
        cidade: document.getElementById("cidade").value,
        pais: document.getElementById("pais").value,
        email: document.getElementById("email").value
    };

    try {
        const response = await fetch("http://127.0.0.1:3000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        if(err){

    if(err.code === "ER_DUP_ENTRY"){
        return res.status(400).send("Este email já está cadastrado.");
    }

    console.log(err);
    res.status(500).send("Erro no servidor");
    return;
}

        const mensagem = await response.text();
alert(mensagem);

        // Limpa o formulário
        document.getElementById("form").reset();
    } catch (err) {
        console.error(err);
        alert("Ocorreu um erro ao cadastrar. Veja o console.");
    }
});
