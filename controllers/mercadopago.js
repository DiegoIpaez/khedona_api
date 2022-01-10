const { request, response } = require("express");
const mercadopago = require("mercadopago");

mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN,
});

const postMercadoPago = async (req = request, res = response) => {
  // Crea un objeto de preferencia
  const m = req.body;

  let preference = {
    items: [
      {
        unit_price: Number(m.unit_price),
        quantity: Number(m.quantity),
        title: String(m.title),
      },
    ],
    back_urls: {
      failure: "http://localhost:2020/",
      pending: "http://localhost:2020/",
      success: "http://localhost:2020/",
    },
    auto_return: "approved",
  };

  await mercadopago.preferences
    .create(preference)
    .then((response) => {
      res.json(response.body.init_point);
      console.log(mercadopago.preferences);
    })
    .catch((error) => {
      res.json({ mjs: error + "" });
    });
};

module.exports = { postMercadoPago };
