const soap = require("soap");
const xml2js = require("xml2js");

const actualizarPromociones = async () => {
  try {
    console.log("[INFO] :: UPDATE - Promociones");

    const Promocion = require("./../models/promocion");

    var urlSoap = process.env.SOAP_URL;
    var args = {
      pCliente: process.env.SOAP_USER,
      pPassword: process.env.SOAP_PASSWORD,
      pFormatoXML: "true",
    };

    Promocion.db.dropCollection("promocions");

    soap.createClient(urlSoap, function (err, client) {
      client.PromocionesCabecera(args, function (err, xml) {
        xml2js
          .parseStringPromise(xml.return.$value, { mergeAttrs: true })

          .then((result) => {
            const json = JSON.stringify(
              result.DATAPACKET.ROWDATA[0].ROW,
              null,
              4
            );

            var promociones = JSON.parse(json);

            Promocion.insertMany(promociones)
              .then(function () {
                console.log("[INFO] :: Promociones guardadas");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => actualizarPromociones());
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("[FAIL] Error de conexión, revisar los logs");
  }
};

module.exports = {
  actualizarPromociones,
};
