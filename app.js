const express = require('express')
const app = express()
const PORT = process.env.PORT ||3000


app.get('/', (req, res)=> {
    res.writeHead(200, { "Content-Type": "text/html", "Access-Control-Allow-Origin": "*" });
    res.send("Hello Jason!")
})

app.listen(PORT, () => console.log("Listening..."))