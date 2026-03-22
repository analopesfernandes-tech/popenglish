const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/register", async (req, res) => {

  const { nome, sobrenome, genero, cidade, pais, email } = req.body;

  try {

    const newUser = await pool.query(
      "INSERT INTO users (nome, sobrenome, genero, cidade, pais, email) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *",
      [nome, sobrenome, genero, cidade, pais, email]
    );

    res.json(newUser.rows[0]);

  } catch (err) {
    console.error(err.message);
  }

});

module.exports = router;
