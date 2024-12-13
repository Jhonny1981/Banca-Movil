const express = require('express');
const mysql = require('mysql');//Conecta a MySQL y realiza consultas
const bodyParser = require('body-parser');//Para que las solicitudes utilizen formato JSON
const { encryptPassword, verifyPassword } = require('./routes/encrypt');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));
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
    //Encripta la contraseña antes de guardarla
    const contraseñaEncriptada = await encryptPassword(contraseña);
    //Consulta para ingresar usuarios
    const query = 'INSERT INTO usuarios (nombre, apellido, email, contraseña) VALUES (?, ?, ?, ?)';
    //Se ejecuta la consulta
    db.query(query, [nombre, apellido, email, contraseñaEncriptada], (err, result) => {
      if (err) {
        console.error('Error al registrar el usuario:', err);
        return res.status(500).json({ message: 'Error al registrar el usuario' });
      }
      res.status(200).json({ message: 'Usuario registrado correctamente' });
    });
  } catch (error) {
    //Error durante la encriptacion
    console.error('Error en el proceso de registro:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const query = 'SELECT * FROM usuarios WHERE email = ?';
  console.log(req.body);
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error('Error al intentar iniciar sesión:', err);
      return res.status(500).json({ message: 'Error al intentar iniciar sesión' });
    }

    //Error si no encientra el correo
    if (results.length === 0) {
      return res.status(404).json({ message: 'No se encuentra una cuenta con ese correo?' });
    }

    //Verifica si coinciden la contraseña ingresada con la encriptada
    const usuario = results[0];
    console.log(password, usuario["contraseña"]);
    const contraseñaCorrecta = await verifyPassword(password, usuario["contraseña"]);


    if (!contraseñaCorrecta) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    res.status(200).json({ message: 'Inicio de sesión exitoso', user: usuario });
  });
});


app.post('/actualizarEfectivo', (req, res) => {
  const { id, dinero } = req.body;
  console.log(req.body);
  const query = 'UPDATE usuarios SET dinero = dinero - ? WHERE id = ?';
  db.query(query, [dinero, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error al actualizar el Efectivo: '+err });
    }
    res.status(200).json({ message: 'Efectivo actualizado correctamente' });
  });
});




app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
