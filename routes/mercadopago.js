const { Router } = require("express");
const { postMercadoPago } = require("../controllers/mercadopago");

const router = Router();

router.post("/", postMercadoPago);

module.exports = router;
