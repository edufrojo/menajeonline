require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/*" }));
app.use("/api/articulos", require("./routes/articulos"));
app.use("/api/promociones", require("./routes/promociones"));
app.use("/api/caracteristicas", require("./routes/caracteristicas"));
app.use("/api/nomenclaturas", require("./routes/nomenclaturas"));
app.use("/api/todo", require("./routes/busquedas"));

const { dbConnection } = require("./database/config");
dbConnection();

const { actualizarArticulos } = require("./soap/articulos");
const { actualizarPromociones } = require("./soap/promociones");
const { actualizarCaracteristicas } = require("./soap/caracteristicas");
const { actualizarNomenclaturas } = require("./soap/nomenclaturas");
const { actualizarStocks } = require("./soap/stocks");

function updateDB() {
  setTimeout(function () {
    actualizarArticulos();
    actualizarPromociones();
    actualizarCaracteristicas();
    actualizarNomenclaturas();
    actualizarStocks();
  }, 3000);
}

//updateDB();

app.listen(process.env.PORT, () => {
  console.log("[INFO] Servidor online en puerto " + process.env.PORT);
});
