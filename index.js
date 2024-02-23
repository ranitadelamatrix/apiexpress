const express = require('express')
const app = express()
const errorHandler = require('./errorHandler')
const router = require('./controlproductos')
app.use(express.json())
app.use(router)

const port = 3000
app.use(errorHandler)

app.listen(port, ()=>{
    console.log("Servidor corriendo en el puerto "+port)
}
)