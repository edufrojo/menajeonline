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

            var nomenclaturas = JSON.parse(json).filter(
              (nomenclatura) =>
                nomenclatura.nomenclatura.toString().indexOf("02") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("05") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("07") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("09") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("10") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("11") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("12") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("13") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("15") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("16") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("17") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("18") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("22") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("23") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("24") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("25") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("26") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("27") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("98") != "0" &&
                nomenclatura.nomenclatura.toString().indexOf("99") != "0"
            );

            Nomenclatura.db.dropCollection("nomenclaturas");

            Nomenclatura.insertMany(nomenclaturas)
              .then(function () {
                console.log("[INFO] :: Nomenclaturas actualizadas");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => actualizarNomenclaturas());
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
