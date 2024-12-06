import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Cargar variables de entorno desde un archivo .env
dotenv.config();
console.log(process.env.DB_HOST || 'Environment variable DB_HOST not loaded');


// Crear una pool de conexiones a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,        // Ejemplo: 'localhost'
  port: process.env.DB_PORT,        // Custom port, e.g., '3308'
  user: process.env.DB_USER,        // Ejemplo: 'root'
  password: process.env.DB_PASSWORD, // Ejemplo: 'tu_contraseña'
  database: process.env.DB_NAME,    // Ejemplo: 'otakudb'
  waitForConnections: true,
  connectionLimit: 10,              // Número de conexiones simultáneas permitidas
  queueLimit: 0
});

// Exportar el pool de conexiones para su uso en otros archivos
export default pool;
