require("custom-env").env();

const express = require("express");
const path = require("path");
const compression = require("compression");
const helmet = require("helmet");
const cors = require("cors");
const bodyParser = require("body-parser");

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
const { descargarImagenes } = require("./soap/descargar-imagenes");
const { optimizarImagenes } = require("./soap/optimizar-imagenes");

async function updateDB() {
  await actualizarArticulos();
  await actualizarPromociones();
  await actualizarCaracteristicas();
  await actualizarNomenclaturas();
  await actualizarStocks();
  await descargarImagenes();
  await optimizarImagenes();
}

setTimeout(function () {
  //updateDB();
}, 8640);

app.listen(process.env.PORT, () => {
  console.log("[INFO] :: Servidor conectado");
});
