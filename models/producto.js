const { Schema, model } = require("mongoose");

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "Usuario",
    required: true,
  },
  precio: {
    type: Number,
    required: [true, "El precio es obligatorio"],
  },
  categoria: {
    type: Schema.Types.ObjectId,
    ref: "Categoria",
    required: true,
  },
  detalle: {
    type: String,
  },
  disponible: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
});

ProductoSchema.methods.toJSON = function () {
  const { __v, estado, ...data } = this.toObject();

  return data;
};

module.exports = model("Producto", ProductoSchema);
