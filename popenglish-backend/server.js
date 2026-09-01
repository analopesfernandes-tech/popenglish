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

/* =========================
DATABASE
========================= */

const db = mysql.createPool({
    uri: process.env.DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

// Testar conexão ao iniciar
db.getConnection((err, connection) => {
    if (err) {
        console.error("Erro ao conectar ao MySQL:", err);
    } else {
        console.log("MySQL conectado");
        connection.release();
    }
});


/* =========================
REGISTER
========================= */

app.post("/users/register", (req, res) => {

    let { nomecompleto, genero, cidade, pais, email } = req.body;

    // Normalizar email
    email = email.toLowerCase().trim();

    const sql = `
        INSERT INTO users (nomecompleto, genero, cidade, pais, email)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql, [nomecompleto, genero, cidade, pais, email], (err, result) => {

        if (err) {

            // TRATAMENTO DO EMAIL DUPLICADO
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(400).json({
                    message: "Este email já está cadastrado"
                });
            }

            console.error(err);

            return res.status(500).json({
                message: "Erro no servidor"
            });
        }

        res.status(201).json({
            message: "Usuário cadastrado com sucesso"
        });
    });

});


/* =========================
LOGIN
========================= */

app.post("/users/login", (req, res) => {

    let { email } = req.body;

    // Normalização
    email = email.toLowerCase().trim();

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Erro no servidor"
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                message: "Email não encontrado"
            });
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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor rodando na porta", PORT);
});
