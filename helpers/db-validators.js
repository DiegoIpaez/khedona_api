const Usuario = require("../models/usuario");
const Categoria = require("../models/categoria");
const Producto = require("../models/producto");
const Pedido = require("../models/pedido");

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

//----------------------------------------------------------------
const categoriaExiste = async (id) => {
  const existeCat = await Categoria.findById(id);

  if (!existeCat) {
    throw new Error(`El id ${id} no existe`);
  }
};

//----------------------------------------------------------------
const productoExiste = async (id) => {
  const existeProducto = await Producto.findById(id);

  if (!existeProducto) {
    throw new Error(`El id ${id} no existe`);
  }
};

//----------------------------------------------------------------
const pedidoExiste = async (id) => {
  const existePedido = await Pedido.findById(id);

  if (!existePedido) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = {
  emailExiste,
  idExiste,
  categoriaExiste,
  productoExiste,
  pedidoExiste,
};
