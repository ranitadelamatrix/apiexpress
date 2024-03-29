

// Obtener todos los productos

const express = require('express');
const app = express();
const { obtenerIntegrantes, crearIntegrantes,obtenerintegrantesId} = require('./conexionpostre'); // Ruta al archivo del módulo
const router = express.Router()
app.use(express.json());

// Ruta para obtener todos los usuarios
router.get('/integrantes', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*')
    try {
        const usuarios = await obtenerIntegrantes();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener usuarios' });
    }
});

router.get("/:id",async (req,res)=>{
    //tengo que seguir aqui armando el get id
    res.header("Access-Control-Allow-Origin","*")
    try{
        const id = (req.params.id)
        const gente = await obtenerintegrantesId(id)
        if(!gente){
            const status = 404;
            res.status(404).json({ error: `No se encontró un integrante con el ID ${id}` });
            throw new Error(`No se encontró un integrante`)
        }else{res.json(gente)
        }}
        catch(error){
        console.error("el error es ", error)
    }
})

// Ruta para crear un nuevo usuario
router.post('/integrantes', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Permitir métodos HTTP específicos
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Permitir encabezados específicos
    const { nombre,edad, email } = req.body;
    if (!nombre ||!edad || !email) {
        return res.status(400).json({ error: 'Nombre, edad y correo son obligatorios' });
    }
    try {
        const nuevoUsuario = await crearIntegrantes(nombre,edad, email);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear usuario' });
    }
});

module.exports = router

