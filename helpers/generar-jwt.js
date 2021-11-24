const jwt = require("jsonwebtoken");

const generarJWT = (uid = "") => {
  //Creamos una (Clase) promesa
  return new Promise((resolve, reject) => {
    const payload = { uid };

    //El metodo sing, es el que me crea el token, tiene de parametros,
    // la data (payload), la SecretKey(.env), y puedo mandar opciones..
    // las opciones van entre llaves '{expira en xhr*}'
    // y por ultimo, hago un callback, donde recivo el error y el token y verifico.
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          reject("No se pudo generar token");
        } else {
          resolve(token);
        }
      }
    );
  }); //fin callback
}; //fin de arrow function

module.exports = { generarJWT };
