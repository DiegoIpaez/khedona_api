const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { postMercadoPago } = require("../controllers/mercadopago");

const router = Router();

router.post(
  "/",
  [
    check("title", "El title es obligatorio").not().isEmpty(),
    check("quantity", "La cantidad es obligatorio").not().isEmpty(),
    check("unit_price", "El precio es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  postMercadoPago
);

module.exports = router;
