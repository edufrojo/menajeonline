const soap = require("soap");
const xml2js = require("xml2js");

const actualizarNomenclaturas = async () => {
  try {
    console.log("[INFO] :: UPDATE - Nomenclaturas");

    const Nomenclatura = require("../models/nomenclatura");

    var urlSoap = process.env.SOAP_URL;
    var args = {
      pCliente: process.env.SOAP_USER,
      pPassword: process.env.SOAP_PASSWORD,
      pFormatoXML: "true",
    };

    Nomenclatura.db.dropCollection("nomenclaturas");

    soap.createClient(urlSoap, function (err, client) {
      client.Nomenclaturas(args, function (err, xml) {
        xml2js
          .parseStringPromise(xml.return.$value, { mergeAttrs: true })

          .then((result) => {
            const json = JSON.stringify(
              result.DATAPACKET.ROWDATA[0].ROW,
              null,
              4
            );

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
  } catch (error) {
    console.log(error);
    throw new Error("[FAIL] Error de conexión, revisar los logs");
  }
};

module.exports = {
  actualizarNomenclaturas,
};
