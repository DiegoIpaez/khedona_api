const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");

const coleccionesPermitivas = ["usuarios", "categorias", "productos"];

//Buscar por colección de usuario
const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

//Las expresiones regulares son patrones utilizados para encontrar una determinada combinación de caracteres dentro de una //cadena de texto. En JavaScript, las expresiones regulares también son objetos.

  const regex = new RegExp(termino, "i"); //insensible a mayusculas y minusculas

  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { email: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    results: usuarios,
  });
};

//Buscar por categoria------------------------------------------------------
const buscarCategorias = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const categorias = await Categoria.find({ nombre: regex, estado: true });
  const total = await Categoria.countDocuments({ nombre: regex, estado: true });
  res.json({
    results: {
      Total: total,
      categorias,
    },
  });
};

//Buscar productos------------------------------------------------------------
const buscarProductos = async (termino = "", res = response) => {
  const esMongoId = ObjectId.isValid(termino);

  if (esMongoId) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i");

  const productos = await Producto.find({
    nombre: regex,
    estado: true,
  }).populate("categoria", "nombre");
  const total = await Producto.countDocuments({ nombre: regex, estado: true });
  res.json({
    results: {
      Total: total,
      productos,
    },
  });
};

//funcion principal----------------------------------------------------------
const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;

  if (!coleccionesPermitivas.includes(coleccion)) {
    return res.status(400).json({
      msg: `Las colecciones permitidas son: ${coleccionesPermitivas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);
      break;

    default:
      res.status(500).json({
        msg: "Se me olvidó hacer esta búsqueda",
      });
  }
};

module.exports = {
  buscar,
};
