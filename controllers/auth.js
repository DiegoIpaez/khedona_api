const { response } = require("express");
const Usuario = require("../models/usuario");
const bcrypt = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  //Extraigo de Usuario, la info. que necesito
  const { email, password } = req.body;

  try {
    //Espera, encontrar el email en la BD
    const usuario = await Usuario.findOne({ email });
    //Verificar si el mail existe
    if (!usuario) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //Si el usuario está activo
    if (!usuario.estado) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos - estado: false",
      });
    }

    //Comparo el password que envia el usuario, con la que tengo en la BD.
    const validPassword = bcrypt.compareSync(password, usuario.password);
    //Verificar la contraseña 
    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Usuario o contraseña incorrectos",
      });
    }

    //Invoco la funcion y Genero el JWT
    const token = await generarJWT(usuario._id);

    res.json({
      ok: true,
      msg: "Login OK",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hablar con el admin",
    });
  }
};

module.exports = { login };
