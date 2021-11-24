//Mongoose Es una herramienta que nos permite crear modelos para podes almacenar
//nuestra información de una manera ordenada y estructurada

const { Schema, model } = require("mongoose");

//Creamos el Schema/Objeto
const UsuarioSchema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  apellido: {
    type: String,
    required: [true, "El apellido es obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  direccion: {
    type: String,
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: true,
    enum: ["USER_ROLE", "ADMIN_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
});

//Para no mostrar password ni __v
UsuarioSchema.methods.toJSON = function () {
  const { password, __v, _id, ...usuario } = this.toObject();

  usuario.uid = _id;

  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
