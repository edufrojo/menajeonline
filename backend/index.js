require("custom-env").env();

const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

const imagemin = require("imagemin");
const imageminWebp = require("imagemin-webp");

const app = express();

app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/*" }));
app.use("/api/articulos", require("./routes/articulos"));
app.use("/api/promociones", require("./routes/promociones"));
app.use("/api/caracteristicas", require("./routes/caracteristicas"));
app.use("/api/stocks", require("./routes/stocks"));
app.use("/api/nomenclaturas", require("./routes/nomenclaturas"));
app.use("/api/todo", require("./routes/busquedas"));

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public/index.html"));
});

const { dbConnection } = require("./database/config");
dbConnection();

const { actualizarArticulos } = require("./soap/articulos");
const { actualizarPromociones } = require("./soap/promociones");
const { actualizarCaracteristicas } = require("./soap/caracteristicas");
const { actualizarNomenclaturas } = require("./soap/nomenclaturas");
const { actualizarStocks } = require("./soap/stocks");

function updateDB() {
  setInterval(function () {
    actualizarArticulos();
    actualizarPromociones();
    actualizarCaracteristicas();
    actualizarNomenclaturas();
    actualizarStocks();
  }, 86400000);
}

updateDB();

/*
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
*/

app.listen(process.env.PORT, () => {
  console.log("[INFO] :: Servidor conectado");
});
