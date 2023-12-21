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


//! Crear la tabla
// db.createTable() 
//   .catch(error => {
//     console.error('Error creating table:', error);
//   });


 //! Usar las rutas de clientes
app.use('/client', clientRoutes);
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
  
//! Ruta de activity depende de project
app.get('/activity', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.activity');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving.' });
    }
  });
  

//! Ruta de projectproduct depende de varias
app.get('/projectproduct', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.projectproduct');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving.' });
    }
  });
  
  //! Ruta de activitycategory depende de varias
  app.get('/activitycategory', async (req, res) => {
    try {
      const result = await db.query('SELECT * FROM public.activitycategory');
      return res.json(result.rows);
    } catch (error) {
      console.error('Error retrieving:', error);
      return res.status(500).json({ error: 'An error occurred while retrieving.' });
    }
  });
  
  
  //! Ruta para ver los resultados de consultaTable
  app.get('/list-tables', async (req, res) => {
    try {
      const result = await db.consultaTable();
      return res.json(result); // Enviar los resultados al navegador en formato JSON
    } catch (error) {
      console.error('Error querying tables:', error);
      return res.status(500).json({ error: 'An error occurred while querying the tables.' });
    }
  });
  
  
  





//!  INSERTS, se estas replicando al doble

//! insert of independient tables.
// db.createTableAndInsertCategories()
//   .catch(error => {
//     console.error('Error insert activities:', error);
//   });


//   db.createTableAndInsertProducts()
//   .catch(error => {
//     console.error('Error insert products:', error);
//   });
  

//   db.insertContractor()
//   .catch(error => {
//     console.error('Error insert products:', error);
//   });






//todo
// db.insertRgisters()
// .catch(error => {
// console.error('Error insert table:', error); 
// });

// db.insertProjects()
//   .catch(error => {
//     console.error('Error insert projects:', error); 
//   });

// db.insertActivities()
//   .catch(error => {
//     console.error('Error insert activities:', error);
//   });



// db.insertActivityCategories()
//   .catch(error => {
//     console.error('Error insert activity categories:', error);
//   });

// db.insertProjectProducts()
//   .catch(error => {
//     console.error('Error insert project products:', error);
//   });

// db.insertTaskEntries()
//   .catch(error => {
//     console.error('Error insert task entries:', error);
//   });






app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });


  