// Importar el paquete pg
const { Pool } = require('pg');

// Configuración de conexión a la base de datos
const pool = new Pool({
    user: 'familia_user',
    host: 'dpg-cncd85qcn0vc73f0ukvg-a.oregon-postgres.render.com',
    database: 'familia', ssl: true,
    password: 'Dw0bKk9p3HMUYopf62AIDlGdZLlbcuTS',
    port: 5432,
});
pool.connect((err,client,release)=>{
    if(err){
    return console.error("el erro es "+ err)
    }console.log("conexiono exitosaaa")
})

// Función para obtener todos los usuarios
async function obtenerIntegrantes() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM usuarios');
        client.release();
        return result.rows;
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        throw error;
    }
}

// Función para crear un nuevo usuario
async function crearIntegrantes(nombre, apellido) {
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *', [nombre, email]);
        client.release();
        return result.rows[0];
    } catch (error) {
        console.error('Error al crear usuario:', error);
        throw error;
    }
}

module.exports = {
    obtenerIntegrantes,
    crearIntegrantes,
};
