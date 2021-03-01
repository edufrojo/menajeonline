const soap = require("soap");
const xml2js = require("xml2js");
let contPro = 0;

const actualizarPromociones = async () => {
  try {
    if (contPro < 5) {
      contPro++;
      console.log("[INFO] :: UPDATE - Promociones (" + contPro + ")");

      const Promocion = require("./../models/promocion");

      var urlSoap = process.env.SOAP_URL;
      var args = {
        pCliente: process.env.SOAP_USER,
        pPassword: process.env.SOAP_PASSWORD,
        pFormatoXML: "true",
      };

      soap.createClient(urlSoap, function (err, client) {
        if (err) console.log(err);
        else {
          client.PromocionesCabecera(args, function (err, xml) {
            if (err) console.log(err);
            else {
              xml2js
                .parseStringPromise(xml.return.$value, { mergeAttrs: true })

                .then((result) => {
                  console.log("[GET] :: UPDATE - Promociones recibidas");
                  const json = JSON.stringify(
                    result.DATAPACKET.ROWDATA[0].ROW,
                    null,
                    4
                  );

                  var promociones = JSON.parse(json);

                  var promociones = promociones.filter(
                    (promocion) =>
                      promocion.cod_promocion != "202009" &&
                      promocion.cod_promocion != "202041" &&
                      promocion.cod_promocion != "202101"
                  );

                  Promocion.db.dropCollection("promocions");

                  Promocion.insertMany(promociones)
                    .then(function () {
                      contPro = 5;
                      console.log("[OK] :: Promociones actualizadas");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err), actualizarPromociones());
            }
          });
        }
      });
    } else {
      console.log("[ERROR] :: Promociones no actualizadas");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  actualizarPromociones,
};
