//Importamos 'dotenv', y para poder usar las variables de entorno, usarmos '.config()'.
require('dotenv').config()
const Server = require('./models/server')

const server = new Server()

server.listen()

//app.get("/", function (req, res) {
  //res.send("no Se ha montado el servidor");
//});


