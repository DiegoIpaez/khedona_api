const { Router } = require("express");
const { check } = require("express-validator");
const { categoriaExiste } = require("../helpers/db-validators");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require('../middlewares/validar-rol')

const {
  obtenerCategorias,
  obtenerCategoria,
  crearCategoria,
  actualizarCategoria,
  borrarCategoria,
} = require("../controllers/categorias");

const router = Router();

//Obtener todas las categ
router.get("/", obtenerCategorias);

//obtener todas las categ por id
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  obtenerCategoria
);

//Crear categoria
router.post(
  "/",
  [
    validarJWT,
    esAdminRole,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

//Editar categ
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  actualizarCategoria
);

//Borrar categ
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(categoriaExiste),
    validarCampos,
  ],
  borrarCategoria
);

module.exports = router;
