const express = require ("express");
const app = express()
const PORT = 8080;

app.get("/api/home", (req, res) => {
    res.json({message: "hello world"})
})

app.listen(PORT, () => {
    console.log(`server is up on port ${PORT}`)
})