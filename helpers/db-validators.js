const Usuario = require("../models/usuario");

const emailExiste = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });

  if (existeEmail) {
    throw new Error(`El email ${email} ya se encuentra registrado`);
  }
};
//-----------------------------------------------------------------

const idExiste = async (id) => {
  const existeUsuario = await Usuario.findById(id);

  if (!existeUsuario) {
    throw new Error(`El id '${id}' no existe`);
  }
};

module.exports = { emailExiste, idExiste };
