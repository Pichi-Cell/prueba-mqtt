const mqtt = require("mqtt");
const brokerUrl = "mqtt://telemetria.dmdcompresores.com";
const options = {
    clientId: `nodejs_client_${Math.random().toString(16).slice(2, 8)}`,
    clean: true,
};
const client = mqtt.connect(brokerUrl, options);


client.on("connect", () => {
    console.log("Conectado al broker MQTT en", brokerUrl);
});

client.on("error", (error) => {
    console.error("Error de conexión MQTT:", error);
});

const publishMessage = (topic, message) => {
    client.publish(topic, message, (err) => {
        if (err) {
            console.error("Error al publicar mensaje:", err);
        }
    });
};

module.exports = { client, publishMessage };