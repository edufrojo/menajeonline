const soap = require("soap");
const xml2js = require("xml2js");

const actualizarCaracteristicas = async () => {
  try {
    console.log("[INFO] :: UPDATE - Caracteristicas");

    const Caracteristica = require("./../models/caracteristica");

    var urlSoap = process.env.SOAP_URL;
    var args = {
      pCliente: process.env.SOAP_USER,
      pPassword: process.env.SOAP_PASSWORD,
      pFormatoXML: "true",
    };

    Caracteristica.db.dropCollection("caracteristicas");

    soap.createClient(urlSoap, function (err, client) {
      client.ArticulosCaracteristicas(args, function (err, xml) {
        xml2js
          .parseStringPromise(xml.return.$value, { mergeAttrs: true })

          .then((result) => {
            const json = JSON.stringify(
              result.DATAPACKET.ROWDATA[0].ROW,
              null,
              4
            );

            var caracteristicas = JSON.parse(json);

            Caracteristica.insertMany(caracteristicas)
              .then(function () {
                console.log("[INFO] :: Caracteristicas guardadas");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => actualizarCaracteristicas());
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("[FAIL] Error de conexión, revisar los logs");
  }
};

module.exports = {
  actualizarCaracteristicas,
};
