
// ==========================================
// 1. SELECCIONAR LOS ELEMENTOS DEL HTML
// ==========================================

const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("nombre");
const campoTemporada = document.getElementById("temporada");
const botonBuscar = document.getElementById("botonBuscar");
const mensaje = document.getElementById("mensaje");
const contador = document.getElementById("contador");
const listaEpisodios = document.getElementById("listaEpisodios");

// Dirección principal de la API
const API_URL = "https://rickandmortyapi.com/api/episode";

// Clave que utilizaremos para guardar la búsqueda
const CLAVE_BUSQUEDA = "ultimaBusquedaRickMorty";


// ==========================================
// 2. MOSTRAR MENSAJES
// ==========================================

const mostrarMensaje = (texto, esError = false) => {
    mensaje.textContent = texto;
    mensaje.classList.toggle("error", esError);
};


// ==========================================
// 3. CONSULTAR LA API
// ==========================================

const obtenerEpisodios = async (nombre, temporada) => {

    // Crear la dirección utilizando URL
    const url = new URL(API_URL);

    // Agregar los parámetros solamente si tienen valor
    if (nombre) {
        url.searchParams.set("name", nombre);
    }

    if (temporada) {
        url.searchParams.set("episode", temporada);
    }

    // Realizar la petición
    const respuesta = await fetch(url);

    // Si no hay coincidencias, la API responde 404
    if (respuesta.status === 404) {
        return {
            sinResultados: true,
            datos: null
        };
    }

    // Comprobar si ocurrió otro error HTTP
    if (!respuesta.ok) {
        throw new Error("Error HTTP: " + respuesta.status);
    }

    // Convertir la respuesta a JSON
    const datos = await respuesta.json();

    return {
        sinResultados: false,
        datos: datos
    };
};


// ==========================================
// 4. CREAR UNA TARJETA
// ==========================================

const crearTarjeta = (episodio) => {

    const tarjeta = document.createElement("article");
    tarjeta.classList.add("tarjeta");

    const codigo = document.createElement("span");
    codigo.classList.add("tarjeta-codigo");
    codigo.textContent = episodio.episode || "Desconocido";

    const titulo = document.createElement("h3");
    titulo.textContent = episodio.name || "Desconocido";

    const fecha = document.createElement("p");
    fecha.textContent = "Emisión: " +
        (episodio.air_date || "Desconocido");

    const personajes = document.createElement("p");
    personajes.textContent = "Personajes: " +
        episodio.characters.length;

    tarjeta.append(codigo, titulo, fecha, personajes);

    return tarjeta;
};


// ==========================================
// 5. MOSTRAR LOS EPISODIOS
// ==========================================

const mostrarEpisodios = (episodios, total) => {

    // Limpiar resultados anteriores
    listaEpisodios.replaceChildren();

    // Ocultar el contador si no hay resultados
    if (episodios.length === 0) {
        contador.hidden = true;
        return;
    }

    // Crear una tarjeta por cada episodio
    episodios.forEach((episodio) => {
        const tarjeta = crearTarjeta(episodio);
        listaEpisodios.appendChild(tarjeta);
    });

    // Mostrar el total de coincidencias y los visibles
    contador.textContent =
        `Total encontrados: ${total} | Mostrados: ${episodios.length}`;

    contador.hidden = false;
};


// ==========================================
// 6. REALIZAR LA BÚSQUEDA
// ==========================================

const buscarEpisodios = async (nombre, temporada) => {

    // Evitar búsquedas sin ningún criterio
    if (!nombre && !temporada) {
        listaEpisodios.replaceChildren();
        contador.hidden = true;

        mostrarMensaje(
            "Escribe un nombre o selecciona una temporada para buscar."
        );

        return;
    }

    // Guardar la búsqueda en localStorage
    const busqueda = {
        nombre: nombre,
        temporada: temporada
    };

    localStorage.setItem(
        CLAVE_BUSQUEDA,
        JSON.stringify(busqueda)
    );

    // Preparar la interfaz
    botonBuscar.disabled = true;
    botonBuscar.textContent = "Buscando...";
    contador.hidden = true;
    listaEpisodios.replaceChildren();

    mostrarMensaje("Buscando episodios...");

    try {

        // Consultar la API
        const resultado = await obtenerEpisodios(
            nombre,
            temporada
        );

        // Comprobar si no existen resultados
        if (resultado.sinResultados) {
            mostrarMensaje("No se encontraron episodios.");
            return;
        }

        // Obtener la información de la respuesta
        const datos = resultado.datos;

        // Mostrar las tarjetas
        mostrarEpisodios(datos.results, datos.info.count);

        mostrarMensaje("Búsqueda completada correctamente.");

    } catch (error) {

        // Mostrar errores de conexión u otros errores HTTP
        console.error("Error al buscar episodios:", error);

        mostrarMensaje(
            "No se pudo completar la búsqueda. Comprueba tu conexión.",
            true
        );

    } finally {

        // Siempre volver a habilitar el botón
        botonBuscar.disabled = false;
        botonBuscar.textContent = "Buscar episodios";
    }
};


// ==========================================
// 7. EVENTO DEL FORMULARIO
// ==========================================

formulario.addEventListener("submit", (evento) => {

    // Evitar que la página se recargue
    evento.preventDefault();

    // Obtener los valores de los campos
    const nombre = campoNombre.value.trim();
    const temporada = campoTemporada.value;

    // Ejecutar la búsqueda
    buscarEpisodios(nombre, temporada);
});


// ==========================================
// 8. RECUPERAR LA ÚLTIMA BÚSQUEDA
// ==========================================

const recuperarBusqueda = () => {

    try {

        const guardado = localStorage.getItem(CLAVE_BUSQUEDA);

        // Si no hay una búsqueda guardada, terminar
        if (!guardado) {
            return;
        }

        // Convertir el texto guardado en un objeto
        const busqueda = JSON.parse(guardado);

        // Completar nuevamente los campos
        campoNombre.value = busqueda.nombre || "";
        campoTemporada.value = busqueda.temporada || "";

        // Repetir la búsqueda si existe algún criterio
        if (campoNombre.value || campoTemporada.value) {
            buscarEpisodios(
                campoNombre.value.trim(),
                campoTemporada.value
            );
        }

    } catch (error) {

        console.error("No se pudo recuperar la búsqueda:", error);

        localStorage.removeItem(CLAVE_BUSQUEDA);
    }
};


// ==========================================
// 9. INICIAR LA APLICACIÓN
// ==========================================

recuperarBusqueda();
