//Para importar express llamo a una variable y le asigno express.
const express = require("express");
const cors = require("cors");

//Importar conexion a BD
const { dbConection } = require("../database/config");

class Server {
  constructor() {
    //llamo a otra variable y le asigno todos los metodos de express.
    this.app = express();
    //creamos la variable para darle el api a nuestra direc.
    this.usariosPath = "/api/usuarios";

    //Conexion
    this.conectarDB()

    //middlewares
    this.middlewares();

    //rutas
    this.routes();
  } //fin de constructor
  //------------------

  //Conectando con la BD
  async conectarDB() {
    await dbConection();
  }

  middlewares() {
    //Carpeta public
    this.app.use(express.static("public"));
    //Cors
    this.app.use(cors());
    //Acceso al body, leer y parsear
    this.app.use(express.json());
  //otra manera para parcear |acepta todo tipo de texto en postman| 
  //this.app.use(express.urlencoded({extended:true}))  
  }

  routes() {
    this.app.use(this.usariosPath, require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      console.log("Servidor online en puerto", process.env.PORT);
    });
  }
} //fin class

module.exports = Server;
