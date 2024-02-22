// Importar el paquete pg
const { Pool } = require('pg');

// Configuración de conexión a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'familia',
    password: 'pancho1677',
    port: 5432,
});

// Función para obtener todos los usuarios
async function obtenerIntegrantes() {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM integrantes');
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
        const result = await client.query('INSERT INTO integrantes (nombre, apellido) VALUES ($1, $2) RETURNING *', [nombre, apellido]);
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
