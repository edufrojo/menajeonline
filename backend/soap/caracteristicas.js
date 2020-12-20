const soap = require("soap");
const xml2js = require("xml2js");
let contCar = 0;

const actualizarCaracteristicas = async () => {
  try {
    if (contCar < 5) {
      contCar++;
      console.log("[INFO] :: UPDATE - Caracteristicas (" + contCar + ")");
      const Caracteristica = require("./../models/caracteristica");

      var urlSoap = process.env.SOAP_URL;
      var args = {
        pCliente: process.env.SOAP_USER,
        pPassword: process.env.SOAP_PASSWORD,
        pFormatoXML: "true",
      };

      soap.createClient(urlSoap, function (err, client) {
        if (err) console.log(err);
        else {
          client.ArticulosCaracteristicas(args, function (err, xml) {
            if (err) console.log(err);
            else {
              xml2js
                .parseStringPromise(xml.return.$value, { mergeAttrs: true })

                .then((result) => {
                  console.log("[GET] :: UPDATE - Caracteristicas recibidas");
                  const json = JSON.stringify(
                    result.DATAPACKET.ROWDATA[0].ROW,
                    null,
                    4
                  );

                  var caracteristicas = JSON.parse(json);

                  Caracteristica.db.dropCollection("caracteristicas");

                  Caracteristica.insertMany(caracteristicas)
                    .then(function () {
                      contCar = 0;
                      console.log("[OK] :: Caracteristicas actualizadas");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err), actualizarCaracteristicas());
            }
          });
        }
      });
    } else {
      contCar = 0;
      console.log("[ERROR] :: Caracteristicas no actualizadas");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  actualizarCaracteristicas,
};
