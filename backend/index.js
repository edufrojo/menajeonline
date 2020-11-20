require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const soap = require("soap");
const xml2js = require("xml2js");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text({ type: "text/*" }));
app.use("/api/articulos", require("./routes/articulos"));
app.use("/api/promociones", require("./routes/promociones"));
app.use("/api/promociones-lineas", require("./routes/promociones-lineas"));
app.use("/api/caracteristicas", require("./routes/caracteristicas"));
app.use("/api/todo", require("./routes/busquedas"));

const { dbConnection } = require("./database/config");
dbConnection();

var urlSoap = process.env.SOAP_URL;
var args = {
  pCliente: process.env.SOAP_USER,
  pPassword: process.env.SOAP_PASSWORD,
  pFormatoXML: "true",
};

/*
const Articulo = require("./models/articulo");

soap.createClient(urlSoap, function (err, client) {
  client.Articulos(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var articulos = JSON.parse(json);

        Articulo.insertMany(articulos)
          .then(function () {
            console.log("[INFO] Artículos guardados");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});



const Nomenclatura = require("./models/nomenclaturas");

soap.createClient(urlSoap, function (err, client) {
  client.Nomenclaturas(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var nomenclaturas = JSON.parse(json);

        Nomenclatura.insertMany(nomenclaturas)
          .then(function () {
            console.log("[INFO] Nomenclaturas guardadas");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});



const Caracteristica = require("./models/caracteristica");

soap.createClient(urlSoap, function (err, client) {
  client.ArticulosCaracteristicas(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var caracteristicas = JSON.parse(json);

        Caracteristica.insertMany(caracteristicas)
          .then(function () {
            console.log("[INFO] Caracteristicas guardadas");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});



const Promocion = require("./models/promocion");

soap.createClient(urlSoap, function (err, client) {
  client.PromocionesCabecera(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var promociones = JSON.parse(json);

        Promocion.insertMany(promociones)
          .then(function () {
            console.log("[INFO] Promociones guardadas");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});



const PromocionLinea = require("./models/promocion-linea");

soap.createClient(urlSoap, function (err, client) {
  client.PromocionesLineas(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        console.log("Hola: " + result);

        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var promocionesLineas = JSON.parse(json);

        PromocionLinea.insertMany(promocionesLineas)
          .then(function () {
            console.log("[INFO] Promociones lineas guardadas");
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});

/*

soap.createClient(urlSoap, function (err, client) {
  client.Nomenclaturas(args, function(err, xml) {
    xml2js.parseStringPromise(xml.return, { mergeAttrs: true })
      .then(result => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);
      }).catch(err => console.log(err));
  });
});



soap.createClient(urlSoap, function (err, client) {
client.Proveedores(args, function(err, xml) {
    xml2js.parseStringPromise(xml.return, { mergeAttrs: true })
      .then(result => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);
      }).catch(err => console.log(err));
  });
});


soap.createClient(urlSoap, function (err, client) {
  client.PromocionesCabecera(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);
        console.log(json);
      })
      .catch((err) => console.log(err));
  });
});



soap.createClient(urlSoap, function (err, client) {
  client.ArticulosCaracteristicas(args, function(err, xml) {
    xml2js.parseStringPromise(xml.return, { mergeAttrs: true })
      .then(result => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);
      }).catch(err => console.log(err));
  });
});

*/

app.listen(process.env.PORT, () => {
  console.log("[INFO] Servidor online en puerto " + process.env.PORT);
});
