const soap = require("soap");
const xml2js = require("xml2js");

const actualizarArticulos = async () => {
  try {
    console.log("[INFO] :: UPDATE - Articulos");

    const Articulo = require("./../models/articulo");

    var urlSoap = process.env.SOAP_URL;
    var args = {
      pCliente: process.env.SOAP_USER,
      pPassword: process.env.SOAP_PASSWORD,
      pFormatoXML: "true",
    };

    Articulo.db.dropCollection("articulos");

    soap.createClient(urlSoap, function (err, client) {
      client.Articulos(args, function (err, xml) {
        xml2js
          .parseStringPromise(xml.return.$value, { mergeAttrs: true })

          .then((result) => {
            const json = JSON.stringify(
              result.DATAPACKET.ROWDATA[0].ROW,
              null,
              4
            );

            var articulos = JSON.parse(json);

            Articulo.insertMany(articulos)
              .then(function () {
                console.log("[INFO] Artículos actualizados");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => console.log(err));
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("[FAIL] Error de conexión, revisar los logs");
  }
};

module.exports = {
  actualizarArticulos,
};
