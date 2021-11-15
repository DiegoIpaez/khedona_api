//Importo expressvalidator || sirve para facilitar las validaciones del back
const { validationResult } = require("express-validator");

const validarCampos = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.json({ errores: errors.array() });
  }

  //Una vez termine de cumplir el bloque de codigo, va a seguir con el sig. proceso
  next()
};

module.exports = { validarCampos };
