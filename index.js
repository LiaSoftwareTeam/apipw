import express from 'express';
import cors from 'cors';
import { createClient } from '@libsql/client';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const client = createClient({
  url: 'libsql://libreria-tursotest56.aws-us-east-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NTM4ODkxMTUsImlkIjoiNzBkMTk2ZGUtZjRiNS00MTgyLTg2NzAtMDgwYmY4YjhjM2QxIiwicmlkIjoiYmM4NjliZDItYmE3OS00OTRmLWFkZDQtODcwOWYyN2ZlMmFjIn0.L5d87xHJZmJsSaZDEft78LVWNgAzQWoD2o7L0UreEEwUQZDHdwN3qYToRQLAbFB-z51-rymFwZbfP7cMpcRwCA'
});

app.get('/libros', async (req, res) => {
  try {
    const results  = await client.execute('SELECT * FROM titulos');
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
});

app.get('/libros/categoria/:categoria', async (req, res) => {
  const categoria = req.params.categoria;
  try {
    const results  = await client.execute('SELECT * FROM titulos WHERE tipo = ?', [categoria]);
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros por categoría' });
  }
});

app.get('/autores', async (req, res) => {
  try {
    const results = await client.execute('SELECT * FROM autores');
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los autores' });
  }
});

app.get('/contactos', async (req, res) => {
  try {
    const results = await client.execute('SELECT * FROM contacto');
    res.json(results.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los contactos' });
  }
});

app.post('/contacto', async (req, res) => {
  const { nombre, email, mensaje } = req.body;
  if (!nombre || !email || !mensaje) {
    return res.status(400).json({ error: 'Datos incompletos' });
  }
  try {
    await client.execute('INSERT INTO contacto (nombre, email, mensaje) VALUES (?, ?, ?)', [nombre, email, mensaje]);
    res.json({ mensaje: 'Contacto guardado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el contacto' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});