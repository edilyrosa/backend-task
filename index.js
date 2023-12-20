import express from "express";
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';

const clientRoutes = require('./routes/clientRoutes'); 
const projectRoutes = require('./routes/projectRoutes'); 
const taskentryRoutes = require('./routes/taskentryRoutes'); 

const db = require('./db'); // Importar db.js

config();// Cargar variables de entorno desde el archivo .env

const app = express(); // El servidor
const port = 3000;

app.use(compression());// Middleware para habilitar la compresión
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("¡I'm at home 🚀");
});

//!ESTO ESTA EN db.js
// const pool = new pg.Pool({
//   connectionString: process.env.DB_URL,
//   ssl: {
//     rejectUnauthorized: false, // Esto permite aceptar certificados autofirmados
//   },
// });

// app.get('/edily', async (req, res) => {
//   try {
//     const result = await pool.query('SELECT NOW()');
//     return res.json(result.rows[0]);
//   } catch (error) {
//     console.error('Error en la consulta a la base de datos:', error);
//     return res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


//! Crear la tabla
db.createTable() 
  .catch(error => {
    console.error('Error creating table:', error);
  });


 //! Usar las rutas de clientes
app.use('/client', clientRoutes);
app.use('/project', projectRoutes);
app.use('/taskentry', taskentryRoutes);



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });