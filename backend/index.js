require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

/*
const soap = require("soap");
const xml2js = require("xml2js");
*/

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api/articulos", require("./routes/articulos"));
app.use("/api/todo", require("./routes/busquedas"));

const { dbConnection } = require("./database/config");
dbConnection();

/*
const Nomenclatura = require("./models/nomenclaturas");
var urlSoap = process.env.SOAP_URL;
var args = {
  pCliente: process.env.SOAP_USER,
  pPassword: process.env.SOAP_PASSWORD,
  pFormatoXML: "true",
};


soap.createClient(urlSoap, function (err, client) {
  client.Nomenclaturas(args, function (err, xml) {
    xml2js
      .parseStringPromise(xml.return, { mergeAttrs: true })

      .then((result) => {
        const json = JSON.stringify(result.DATAPACKET.ROWDATA[0].ROW, null, 4);

        var nomenclaturas = JSON.parse(json);
        console.log(nomenclaturas);

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
            connection.close();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});


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
            connection.close();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});


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
            connection.close();
          })
          .catch(function (error) {
            console.log(error);
          });
      })
      .catch((err) => console.log(err));
  });
});

client.Nomenclaturas(args, function(err, xml) {

  xml2js.parseStringPromise(xml.return, { mergeAttrs: true })

    .then(result => {

      const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);

    }).catch(err => console.log(err));

});

client.Proveedores(args, function(err, xml) {

  xml2js.parseStringPromise(xml.return, { mergeAttrs: true })

    .then(result => {

      const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);

    }).catch(err => console.log(err));

});

client.PromocionesCabecera(args, function(err, xml) {

  xml2js.parseStringPromise(xml.return, { mergeAttrs: true })

    .then(result => {

      const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);

    }).catch(err => console.log(err));

});

client.ArticulosCaracteristicas(args, function(err, xml) {

  xml2js.parseStringPromise(xml.return, { mergeAttrs: true })

    .then(result => {

      const json = JSON.stringify(result.DATAPACKET.ROWDATA, null, 4);

    }).catch(err => console.log(err));

});

*/

app.listen(process.env.PORT, () => {
  console.log("[INFO] Servidor online en puerto " + process.env.PORT);
});
