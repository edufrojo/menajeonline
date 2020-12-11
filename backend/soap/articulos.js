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

            var articulos = articulos.filter(
              (articulo) =>
                articulo.departamento != "02" &&
                articulo.departamento != "05" &&
                articulo.departamento != "07" &&
                articulo.departamento != "09" &&
                articulo.departamento != "10" &&
                articulo.departamento != "11" &&
                articulo.departamento != "12" &&
                articulo.departamento != "13" &&
                articulo.departamento != "15" &&
                articulo.departamento != "16" &&
                articulo.departamento != "17" &&
                articulo.departamento != "18" &&
                articulo.departamento != "22" &&
                articulo.departamento != "23" &&
                articulo.departamento != "24" &&
                articulo.departamento != "25" &&
                articulo.departamento != "26" &&
                articulo.departamento != "27" &&
                articulo.departamento != "98" &&
                articulo.departamento != "99"
            );

            Articulo.db.dropCollection("articulos");

            Articulo.insertMany(articulos)
              .then(function () {
                console.log("[INFO] :: Artículos actualizados");
              })
              .catch(function (error) {
                console.log(error);
              });
          })
          .catch((err) => actualizarArticulos());
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
