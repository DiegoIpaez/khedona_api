//Inporto de express req y res para poder utilizar sus metodos
const { request, response } = require("express");
//Importamos el Schema
const Usuario = require("../models/usuario");
//Importamos bcrypt.js || sirve para encriptar pass.
const bcrypt = require("bcryptjs");

//Muestra los usuarios----------------------------------------
const usuariosGet = async (req = request, res = response) => {
  let { limite = 4, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 4;
  }
  if (isNaN(desde)) {
    desde = 0;
  }

  const usuarios = await Usuario.find({ estado: true })
    .limit(limite)
    .skip(desde);

  const total = await Usuario.countDocuments({ estado: true });

  res.json({
    usuarios,
    total,
  });
};

//Muestra los usuarios id--------------------------------------
const usuariosGetId = async (req = request, res = response) => {
  const { id } = req.params;
  const usuario = await Usuario.findById(id);

  res.json({
    usuario,
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
  usuariosGetId,
  usuariosPost,
  usuariosPut,
  usuariosDel,
};
