const fs = require("fs");
const fetch = require("node-fetch");

const descargarImagenes = async () => {
  try {
    const Articulo = require("./models/articulo");

    console.log("[INFO] :: UPDATE - Descargar imágenes");

    let listaArticulos = Object.values(await Articulo.find());
    console.log(listaArticulos.length);

    for (let i = 0; i < listaArticulos.length; i++) {
      const url = listaArticulos[i].url_imagen.toString();
      const path =
        "../frontend/src/assets/images/articulos/" +
        listaArticulos[i].cod_articulo.toString() +
        ".jpg";

      if (url !== "") {
        async function download() {
          const response = await fetch(url);
          const buffer = await response.buffer();
          fs.writeFileSync(path, buffer);
        }

        download();
      }
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  descargarImagenes,
};
