const express = require("express");
const cors = require("cors");
const { publishMessage, listenTopic } = require("./utils/mqttclients");
const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 5, checkperiod: 120 });
const app = express();

const port = 3000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

listenTopic("Raspis_Disponibles", (message) => {
  cache.set(Date.now(), message);
  const keys = cache.keys().filter((key) => key !== "raspis_disponibles");
  const raspis_disponibles = keys
    .reduce((accumulator, key) => {
      if (accumulator.includes(cache.get(key)) || !cache.get(key)) {
        return accumulator;
      }
      accumulator.push(cache.get(key));
      return accumulator;
    }, [])
    .map((valoractual) => {
      return JSON.parse(valoractual);
    });
  cache.set("raspis_disponibles", JSON.stringify(raspis_disponibles));
  console.log(cache.get("raspis_disponibles"), "este");
});

app.get("/", (req, res) => {
  res.send("esto anda").status(200);
});

app.post("/formulario", (req, res) => {
  const formData = req.body;
  console.log(formData);

  publishMessage(`config_raspis`, JSON.stringify(formData));
  res.status(204).send();
});

app.get("/raspis_disponibles", (req, res) => {
  res.status(200).send(cache.get("raspis_disponibles"));
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
