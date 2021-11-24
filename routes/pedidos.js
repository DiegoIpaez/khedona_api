const { Router } = require("express");
const { check } = require("express-validator")

//Importo los middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

//Importo el check custom
const { pedidoExiste } = require("../helpers/db-validators");

//Importo los controladores
const {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  borrarPedido,
  obtenerPedidosUser,
} = require("../controllers/pedidos");

const router = Router();

//Mostrar
router.get("/", obtenerPedidos);
router.get(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(pedidoExiste),
  ],
  obtenerPedido
);
router.get("/user/:id", obtenerPedidosUser);

//Post
router.post("/", [validarJWT], crearPedido);

//Actualizar
router.put(
  "/:id",
  [
    validarJWT,
    check("id", "El ID del Pedido es necesario").not().isEmpty(),
    check("id").custom(pedidoExiste),
    validarCampos,
  ],
  actualizarPedido
);

//Borrar
router.delete(
  "/:id",
  [
    validarJWT,
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(pedidoExiste),
    validarCampos,
  ],
  borrarPedido
);

module.exports = router;
