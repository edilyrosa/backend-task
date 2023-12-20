import express from "express";
import pg from "pg";
import { config } from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';

// Cargar variables de entorno desde el archivo .env
config();

const app = express(); // El servidor

app.use(bodyParser.json());
app.use(cors());

const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl: {
    rejectUnauthorized: false, // Esto permite aceptar certificados autofirmados
  },
});

app.get('/', (req, res) => {
  res.send("¡I'm at home 🚀");
});

app.get('/edily', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');
    return res.json(result.rows[0]);
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});