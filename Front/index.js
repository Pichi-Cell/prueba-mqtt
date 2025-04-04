// Manejar el envío del formulario
const form = document.getElementById("equipoForm");
const raspis = form.raspis;
const flowsHTML = form.flows;
const get_raspis_disponibles = async () => {
  try {
    const datos = await fetch("http://localhost:3000/raspis_disponibles");
    return datos.json();
  } catch (err) {
    console.error(err);
  }
};
const get_flows_raspi = async (ip_raspi) => {
  try {
    const flows = await fetch(`http://${ip_raspi}:1880/flows`);
    return flows.json();
  } catch (err) {
    console.error(err);
  }
};
const obtenerIps = async () => {
  const datos = await get_raspis_disponibles();
  console.log(datos, "jeje");
  return datos;
};

const obtenerFlows = async () => {
  flowsHTML.innerHTML = "";
  const flows = await get_flows_raspi(raspis.value);
  const filteredFlows = flows.filter((object) => {
    if (object.type === "tab") {
      console.log(object.type);
      return object;
    }
    return;
  });

  filteredFlows.map((objeto) => {
    flowsHTML.innerHTML += `<option value="${objeto.id}">${objeto.label}</option>`;
  });
  return "ok";
};
obtenerIps().then((resultado) => {
  resultado.map((dato) => {
    let disponibilidad = "class = 'available'";
    if (dato.estado_raspi !== "disponible") {
      disponibilidad = "class = 'not_available'";
    }
    raspis.innerHTML += `<option value="${dato.ip_raspi}" ${disponibilidad}>${dato.ip_raspi}</option>`;
  });
});

document
  .getElementById("equipoForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Recoger los datos del formulario
    const idEquipo = document.getElementById("idEquipo").value;
    const raspi_seleccionada = document.getElementById("raspis").value;
    // Validar que todos los campos estén completos
    if (!idEquipo || !raspi_seleccionada) {
      document.getElementById("errorMessage").textContent =
        "Todos los campos son obligatorios.";
      return;
    }

    // Crear el objeto con los datos del formulario
    const data = {
      idEquipo: idEquipo,
      raspi_seleccionada: raspi_seleccionada,
    };

    console.log(JSON.stringify(data));

    // Enviar los datos al backend usando fetch
    const response = await fetch("http://localhost:3000/formulario", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      console.error("Error al enviar los datos:", error);
      document.getElementById("errorMessage").textContent =
        "Error al conectar con el servidor.";
    });
  });
