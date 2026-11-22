# Buscador de episodios de Rick and Morty

Aplicación web que permite buscar episodios de la serie Rick and Morty utilizando su API pública. Los usuarios pueden buscar por nombre, filtrar por temporada y visualizar los resultados mediante tarjetas.

**Autor:** Nicolás Rojas  
**Materia:** Fundamentos de Desarrollo Web - UCSA  
**Variante del TP:** C - Episodios

## Sitios publicados

- **GitHub Pages:** https://rc-999-fr.github.io/tp-rojas-nicolas/
- **Vercel:** Pendiente de publicación.

## Captura

![Captura de la aplicación](img/captura.png)

## Funcionalidades

- Buscar episodios por nombre.
- Filtrar episodios por temporada.
- Mostrar el nombre, código, fecha de emisión y cantidad de personajes.
- Mostrar mensajes durante la búsqueda.
- Informar cuando no existen resultados.
- Manejar errores de conexión.
- Guardar la última búsqueda mediante localStorage.
- Adaptarse a diferentes tamaños de pantalla.

## Tecnologías utilizadas

- HTML5: estructura de la página.
- CSS3: diseño, Grid, Flexbox y responsive.
- JavaScript ES6+: funcionamiento de la aplicación.
- Fetch API: consulta de episodios.
- localStorage: almacenamiento de la última búsqueda.
- API de Rick and Morty: fuente de información.

## Estructura del proyecto

```text
tp-rojas-nicolas/
├── index.html
├── README.md
├── .gitignore
├── css/
│   └── estilos.css
├── js/
│   └── app.js
└── img/
    └── captura.png
```

## Cómo ejecutar el proyecto localmente

1. Descargar o clonar el repositorio:

   `git clone https://github.com/rc-999-fr/tp-rojas-nicolas.git`

2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir `index.html` en el navegador o utilizar Live Server.
4. Escribir el nombre de un episodio o seleccionar una temporada.
5. Presionar el botón Buscar.

## Despliegue

El proyecto se publica mediante GitHub Pages y Vercel.

La rama principal utilizada para la publicación es `main`.

Cuando se realizan cambios y se envían a GitHub mediante `git push`, las plataformas conectadas pueden actualizar automáticamente la página publicada.

## Repositorio

https://github.com/rc-999-fr/tp-rojas-nicolas