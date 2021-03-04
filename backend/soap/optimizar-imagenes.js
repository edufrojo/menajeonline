const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const actualizarImagenes = async () => {
  try {
    (async () => {
      console.log("[INFO] :: UPDATE - Optimizar imágenes");

      await imagemin(["../frontend/src/assets/images/articulos/*.{jpg,png}"], {
        destination: "../frontend/src/assets/images/articulos/",
        plugins: [
          imageminWebp({
            quality: 75,
          }),
        ],
      })
        .then(() => {
          console.log("[OK] :: UPDATE - Imágenes optimizadas");
        })
        .catch((err) => {
          console.log(err);
        });
    })();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  actualizarImagenes,
};
