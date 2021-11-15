//Inporto de express req y res para poder utilizar sus metodos
const { request, response } = require("express");
//Importamos el Schema
const Usuario = require("../models/usuario");
//Importamos bcrypt.js || sirve para encriptar pass.
const bcrypt = require("bcryptjs");

//Muestra los usuarios----------------------------------------
const usuariosGet = (req = request, res = response) => {
  res.json({
    msj: "GET usuarios",
  });
};

//Crea Usuarios------------------------------------------------
const usuariosPost = async (req = request, res = response) => {
  const { nombre, apellido, email, password, rol } = req.body;

  const usuario = new Usuario({ nombre, apellido, email, password, rol });

  //encriptar password.
  const salt = bcrypt.genSaltSync();
  //aplicar encriptacion
  usuario.password = bcrypt.hashSync(password, salt);

  //espero al servidor y guardo la data ingresada.
  await usuario.save();

  res.json({
    msj: "Usuario Creado",
    usuario,
  });
};

//Edita Usuarios----------------------------------------------
const usuariosPut = async (req = request, res = response) => {
  const id = req.params.id;
  //Solo llamo a resto, ya que es lo que necesito cambiar, los otros, son variables que no podran editarse.
  const { _id, email, password, rol, ...resto } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto, { new: true });

  res.json({
    msj: "Usuario actualizado",
    usuario,
  });
};

//Elimina Usuarios--------------------------------------------
const usuariosDel = async (req = request, res = response) => {
  const id = req.params.id;
  //borra el usuario(mala practica)
  //const usuario = await Usuario.findByIdAndDelete(id, body);
  const usuario = await Usuario.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msj: "Se ha desactivado el usuario",
    usuario,
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDel,
};
