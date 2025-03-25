const express = require("express");
const cors = require("cors");
const { publishMessage } = require("./utils/mqttclients");

const app = express();

const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.get("/", (req, res) => {
  res.send("esto anda").status(200);
});

app.post("/formulario", (req, res) => {
  const formData = req.body;
  console.log(formData);

  publishMessage(`config_raspis`, JSON.stringify(formData));
  res.status(204).send();
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
