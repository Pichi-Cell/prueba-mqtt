const express = require('express');
const cors = require('cors');  // Requiere el paquete CORS
const mqtt = require('mqtt');  // Asegúrate de agregar esta línea
// Crear una instancia de la aplicación
const app = express();

// Definir el puerto en el que escuchará el servidor
const port = 3000;

// Middleware para procesar datos en formato JSON
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Configuración del cliente MQTT
const mqttUrl = 'http://175.10.0.127:1080';  // Asegúrate de usar la URL del broker MQTT (localhost si está en el mismo servidor)
const mqttOptions = {
  clientId: 'nodejs-client',  // Un identificador único para el cliente MQTT
  clean: true,  // Si la conexión debe limpiarse al desconectar
  connectTimeout: 4000,  // Tiempo de espera para conectar
  reconnectPeriod: 1000,  // Reintentar la conexión cada 1 segundo si se pierde
};


const mqttClient = mqtt.connect(mqttUrl, mqttOptions);


// Conectar al broker MQTT
mqttClient.on('connect', () => {
    console.log('Conectado al broker MQTT');
  });
  
  // En caso de que haya un error de conexión con el broker MQTT
  mqttClient.on('error', (err) => {
    console.error('Error de conexión MQTT:', err);
  });


// Ruta de ejemplo para verificar si el servidor está funcionando
app.get('/', (req, res) => {
  res.send('¡Hola Mundo! API está funcionando');
});

// Una ruta más compleja (por ejemplo, obtener todos los usuarios)
app.post('/formulario', (req, res) => {
    // Aquí deberías poder acceder a los datos enviados en la solicitud
    const nuevoUsuario = req.body;
    console.log(nuevoUsuario)
  
 mqttClient.publish('nodered/usuarios', JSON.stringify(nuevoUsuario), (err) => {
    if (err) {
      console.error('Error al publicar en el tema MQTT:', err);
      return res.status(500).json({ mensaje: 'Error al publicar en MQTT' });
    }

    // Responder con los datos recibidos y publicados
    res.json({
      mensaje: 'Usuario recibido y publicado en MQTT',
      usuario: nuevoUsuario,
    });
  });
  });

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});