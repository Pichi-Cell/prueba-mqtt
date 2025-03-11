// Manejar el envío del formulario
document.getElementById("equipoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Recoger los datos del formulario
    const idEquipo = document.getElementById("idEquipo").value;


    // Validar que todos los campos estén completos
    if (!idEquipo) {
        document.getElementById("errorMessage").textContent = "Todos los campos son obligatorios.";
        return;
    }

    // Crear el objeto con los datos del formulario
    const data = {
        idEquipo: idEquipo,
    };

    console.log(JSON.stringify(data));

    // Enviar los datos al backend usando fetch
    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            // Mostrar mensaje de éxito (o manejar la respuesta del backend)
            if (data.success) {
                alert("Datos enviados correctamente.");
            } else {
                document.getElementById("errorMessage").textContent = "Hubo un error al enviar los datos.";
            }
        })
        .catch(error => {
            console.error('Error al enviar los datos:', error);
            document.getElementById("errorMessage").textContent = "Error al conectar con el servidor.";
        });
});
