const express = require('express');
const cors = require('cors');  // Requiere el paquete CORS
const { publishMessage } = require("./utils/mqttclients");
// Crear una instancia de la aplicación
const app = express();

// Definir el puerto en el que escuchará el servidor
const port = 3000;

// Middleware para procesar datos en formato JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());


// Ruta de ejemplo para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! API está funcionando');
});

// Una ruta más compleja (por ejemplo, obtener todos los usuarios)
app.post('/formulario', (req, res) => {
  // Aquí deberías poder acceder a los datos enviados en la solicitud
  const nuevoUsuario = req.body;
  console.log(nuevoUsuario)

  publishMessage(`identificacion_TDB/informacion`, JSON.stringify(nuevoUsuario));

});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});