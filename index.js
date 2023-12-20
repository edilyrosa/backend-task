import express from "express";
import pg from "pg";
import {config} from 'dotenv';

config()


const app = express() //The server

const pool = new pg.Pool({
  connectionString: process.env.DB_URL,
  ssl:true
}); 


app.get('/edily',async  (req, res) => {
  const result = await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
  });

app.get('/', (req, res) => {
    res.send("¡I'm on the home 🚀");
  });

app.listen(3000) //will listen on p0rt 3000
console.log('Server on port 3000');
