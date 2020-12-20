const soap = require("soap");
const xml2js = require("xml2js");
let contSto = 0;

const actualizarStocks = async () => {
  try {
    if (contSto < 5) {
      contSto++;
      console.log("[INFO] :: UPDATE - Stocks (" + contSto + ")");

      const Stock = require("./../models/stock");

      var urlSoap = process.env.SOAP_URL;
      var args = {
        pCliente: process.env.SOAP_USER,
        pPassword: process.env.SOAP_PASSWORD,
        pFormatoXML: "true",
      };

      soap.createClient(urlSoap, function (err, client) {
        if (err) console.log(err);
        else {
          client.ArticulosStock(args, function (err, xml) {
            if (err) console.log(err);
            else {
              xml2js
                .parseStringPromise(xml.return.$value, { mergeAttrs: true })

                .then((result) => {
                  console.log("[GET] :: UPDATE - Stocks recibidos");
                  const json = JSON.stringify(
                    result.DATAPACKET.ROWDATA[0].ROW,
                    null,
                    4
                  );

                  var stocks = JSON.parse(json);

                  Stock.db.dropCollection("stocks");

                  Stock.insertMany(stocks)
                    .then(function () {
                      contSto = 0;
                      console.log("[OK] :: Stocks actualizados");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err), actualizarStocks());
            }
          });
        }
      });
    } else {
      contSto = 0;
      console.log("[ERROR] :: Stocks no actualizados");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  actualizarStocks,
};
