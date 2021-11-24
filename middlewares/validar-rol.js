const { request, response } = require("express");

const esAdminRole = async (req = request, res = response, next) => {
  //Verificamos si existe el usuario
  if (!req.usuario) {
    return res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token primero",
    });
  }

  //Traigo la info. que necesito
  const { rol, nombre } = req.usuario;

  ///Verifico si es admin
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador`,
    });
  }

  next();
};

module.exports = { esAdminRole };
