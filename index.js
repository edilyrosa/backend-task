import express from "express";
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import compression from 'compression';

//import clientRoutes from'../routes/clientRoutes.js'; 
import clientRoutes from'./routes/clientRoutes.js'
import projectRoutes from './routes/projectRoutes.js'; 
import taskentryRoutes from './routes/taskentryRoutes.js'; 

import db from './db.js'; // Importar db.js


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
db.createTable1() 
  .catch(error => {
    console.error('Error creating table:', error);
  });
db.createTable2() 
  .catch(error => {
    console.error('Error creating table:', error);
  });


 //! Usar las rutas de clientes
app.use('/client', clientRoutes);
//TODO: ME FALTAN ESTAS 2
app.use('/project', projectRoutes);
app.use('/taskentry', taskentryRoutes);



//! Rutas Independientes de tablas sin CRUD

//! Ruta de category
app.get('/category', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.category');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving categories:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving categories.' });
    }
  });
  
  //! Ruta de product
  app.get('/product', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.product');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving.' });
    }
  });
  
  //! Ruta de contractor
  app.get('/contractor', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.contractor');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving.' });
    }
  });






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });