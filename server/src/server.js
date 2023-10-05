const express = require("express");
const cors = require("cors");
const authRouter = require("./routes/auth.js");

const app = express()
const PORT = 8080;

app.use(express.json())
app.use(cors())

// RUTAS //

app.use("/auth", authRouter)

module.exports = app;