const { response } = require("express");
const Pedido = require("../models/pedido");

//Get
const obtenerPedidos = async (req, res = response) => {
  let { limite = 5, desde = 0 } = req.query;

  limite = Number(limite);
  desde = Number(desde);

  if (isNaN(limite)) {
    limite = 5;
  }

  if (isNaN(desde)) {
    desde = 0;
  }

  const [total, pedidos] = await Promise.all([
    Pedido.countDocuments({ estado: true }),
    Pedido.find({ estado: true })
      .skip(desde)
      .limit(limite)
      .populate("usuario", "nombre email"),
  ]);

  res.json({
    Total: total,
    pedidos,
  });
};

//Get:id
const obtenerPedido = async (req, res = response) => {
  const { id } = req.params;

  const pedido = await Pedido.findById(id).populate("usuario", "nombre email");
  res.json({
    pedido,
  });
};

//Get:user
const obtenerPedidosUser = async (req, res = response) => {
  const { id } = req.params;

  const [total, pedidos] = await Promise.all([
    Pedido.countDocuments({ estado: true }),
    Pedido.find({ usuario: id, estado: true }),
  ]);

  res.json({
    Total: total,
    pedidos,
  });
};

//Post
const crearPedido = async (req, res = response) => {
  const { estado, realizado, ...body } = req.body;

  const data = {
    ...body,
    usuario: req.usuario._id,
  };
  const pedido = new Pedido(data);
  await pedido.save();

  res.status(201).json({
    msg: "Pedido exitoso",
    pedido,
  });
};

//Put
const actualizarPedido = async (req, res = response) => {
  const { id } = req.params;

  try {
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return res.status(404).json({
        msg: "Pedido no encontrado por ID",
        pedido,
      });
    } else {
      if (pedido.realizado) {
        return res.status(404).json({
          msg: "El Pedido ya se encuentra Realizado, no se puede actualizar",
          pedido,
        });
      }
    }

    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      id,
      { realizado: true },
      { new: true }
    );

    res.json({
      msg: "Pedido actualizado",
      pedidoActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error interno.",
    });
  }
};

//Delete
const borrarPedido = async (req, res = response) => {
  const { id } = req.params;

  const pedido = await Pedido.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );

  res.json({
    msg: "Pedido eliminado",
    pedido,
  });
};

module.exports = {
  crearPedido,
  obtenerPedido,
  obtenerPedidos,
  actualizarPedido,
  borrarPedido,
  obtenerPedidosUser,
};
