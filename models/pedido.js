const { Schema, model } = require("mongoose");

const PedidoSchema = new Schema(
  {
    usuario: {
      type: Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
    productos: [
      {
        nombre: {
          type: String,
          required: true,
        },
        cantidad: {
          type: Number,
          required: true,
        },
        precio: {
          type: Number,
          required: true,
        },
      },
    ],
    total: {
      type: Number,
    },
    nota: {
      type: String,
    },
    estado: {
      type: Boolean,
      default: true,
      required: true,
    },
    realizado: {
      type: Boolean,
      default: false,
      required: true,
    },
    fecha: {
      type: Date,
      default: Date.now,
    },
  }
);

PedidoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();
  return data;
};

module.exports = model("Pedido", PedidoSchema);
