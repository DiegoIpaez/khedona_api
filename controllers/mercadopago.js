const { request, response } = require("express");
const mercadopago = require("mercadopago");

const postMercadoPago = async (req = request, res = response) => {
  mercadopago.configure({
    access_token:
      "APP_USR-120464152929119-010921-296359fb8e02d17acc411b972f50c9e2-1053932968",
  });

  // Crea un objeto de preferencia
  let preference = {
    items: [
      {
        title: req.body.title,
        unit_price: parseInt(req.body.unit_price),
        quantity: parseInt(req.body.quantity),
      },
    ],
  };

  mercadopago.preferences
    .create(await preference)
    .then((response) => {
      res.json(response.body);
      
    })
    .catch(function (error) {
      console.log(error);
    });
};

module.exports = { postMercadoPago };
