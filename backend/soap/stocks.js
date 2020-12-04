const soap = require("soap");
const xml2js = require("xml2js");

const actualizarStocks = async () => {
  try {
    console.log("[INFO] :: UPDATE - Stocks");

    const Stock = require("./../models/stock");

    var urlSoap = process.env.SOAP_URL;
    var args = {
      pCliente: process.env.SOAP_USER,
      pPassword: process.env.SOAP_PASSWORD,
      pFormatoXML: "true",
    };

    Stock.db.dropCollection("stocks");

    soap.createClient(urlSoap, function (err, client) {
      client.ArticulosStock(args, function (err, xml) {
        xml2js
          .parseStringPromise(xml.return.$value, { mergeAttrs: true })

          .then((result) => {
            const json = JSON.stringify(
              result.DATAPACKET.ROWDATA[0].ROW,
              null,
              4
            );

            var stocks = JSON.parse(json);

            Stock.insertMany(stocks)
              .then(function () {
                console.log("[INFO] Stocks guardados");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => actualizarStocks());
      });
    });
  } catch (error) {
    console.log(error);
    throw new Error("[FAIL] Error de conexión, revisar los logs");
  }
};

module.exports = {
  actualizarStocks,
};
