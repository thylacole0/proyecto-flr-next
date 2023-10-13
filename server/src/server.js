const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.js");
const pool = require("./database/db.js");

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(cors())

// RUTAS //

app.use("/auth", authRouter)

app.use("/main", require("./routes/main.js"))

app.post('/form_visitante', async (req, res) => {
    try {
        const { rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado } = req.body;
        const newVisitante = await pool.query('INSERT INTO visitante (rut, nombres_vis, apes_vis, email_vis, telefono_vis, direccion_vis, rut_residente) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [rutVisit, nombresVisit, apellidosVisit, correoVisit, celVisit, direccionVisit, rutVinculado]);
        res.json(newVisitante.rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

module.exports = app;