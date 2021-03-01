const soap = require("soap");
const xml2js = require("xml2js");
const fs = require("fs");
const fetch = require("node-fetch");

let contArt = 0;

const actualizarArticulos = async () => {
  try {
    if (contArt < 5) {
      contArt++;
      console.log("[INFO] :: UPDATE - Articulos (" + contArt + ")");

      const Articulo = require("./../models/articulo");

      var urlSoap = process.env.SOAP_URL;
      var args = {
        pCliente: process.env.SOAP_USER,
        pPassword: process.env.SOAP_PASSWORD,
        pFormatoXML: "true",
      };

      soap.createClient(urlSoap, function (err, client) {
        if (err) console.log(err);
        else {
          client.Articulos(args, function (err, xml) {
            if (err) console.log(err);
            else {
              xml2js
                .parseStringPromise(xml.return.$value, { mergeAttrs: true })

                .then((result) => {
                  console.log("[GET] :: UPDATE - Articulos recibidos");
                  const json = JSON.stringify(
                    result.DATAPACKET.ROWDATA[0].ROW,
                    null,
                    4
                  );

                  var articulos = JSON.parse(json);

                  articulos = articulos.filter(
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
                      contArt = 5;
                      console.log("[OK] :: UPDATE - Artículos actualizados");
                    })
                    .catch(function (error) {
                      console.log(error);
                    });
                })
                .catch((err) => console.log(err), actualizarArticulos());
            }
          });
        }
      });

      console.log("[INFO] :: UPDATE - Actualizar imágenes");

      var listaArticulos = Articulo.find();
      listaArticulos.forEach((articulo) => {
        const url = articulo.url_imagen.toString();
        const path =
          "../frontend/src/assets/images/articulos/" +
          articulo.cod_articulo.toString() +
          ".jpg";

        if (url !== "") {
          async function download() {
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(path, buffer);
          }

          download();
        }
      });
    } else {
      console.log("[ERROR] :: Articulos no actualizados");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  actualizarArticulos,
};
