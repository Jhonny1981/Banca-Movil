const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const { encryptPassword, verifyPassword } = require('./routes/encrypt');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Bancamovil',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos MySQL!');
});


app.post('/register', async (req, res) => {
  const { nombre, apellido, email, contraseña } = req.body;

  try {
    const contraseñaEncriptada = await encryptPassword(contraseña);

    const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
    db.query(query, [nombre, apellido, email, contraseñaEncriptada], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    console.error('Error en el proceso de registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.post('/login', (req, res) => {
  const { email, contraseña } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error al intentar iniciar sesión:', err);
      return res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encuentra una cuenta con ese correo' });
    }

    const usuario = results[0];
    const contraseñaCorrecta = await verifyPassword(contraseña, usuario.contraseña);

    if (!contraseñaCorrecta) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
