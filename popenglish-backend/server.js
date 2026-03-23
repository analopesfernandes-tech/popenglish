require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Backend funcionando 🚀");
});

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect(err => {
    if(err){
        console.log(err);
    } else {
        console.log("MySQL conectado");
    }
});

/* =========================
REGISTER
========================= */

app.post("/users/register", (req, res) => {

    const { nomecompleto, genero, cidade, pais, email } = req.body;

    const sql = `
        INSERT INTO users (nomecompleto, genero, cidade, pais, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nomecompleto, genero, cidade, pais, email], (err, result) => {

        if(err){
            console.log(err);
            return res.status(500).send("Erro");
        }

        res.send("Usuário cadastrado");
    });

});

/* =========================
LOGIN
========================= */

app.post("/users/login", (req, res) => {

    const { email } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {

        if(err){
            console.log(err);
            return res.status(500).json({ message: "Erro no servidor" });
        }

        if(result.length === 0){
            return res.status(404).json({ message: "Email não encontrado" });
        }

        res.json({
            message: "Login realizado com sucesso",
            user: {
                nome: result[0].nomecompleto,
                email: result[0].email
            }
        });

    });

});

/* =========================
SERVER
========================= */

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor rodando na porta 3000");
});

