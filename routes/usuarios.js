const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

//Importo los controladores
const {
  usuariosGet,
  usuariosGetId,
  usuariosPost,
  usuariosPut,
  usuariosDel,
} = require("../controllers/usuarios");

//Importo las validaciones de campo o Middlewares
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { esAdminRole } = require("../middlewares/validar-rol");
//Importo los check custom
const { emailExiste, idExiste } = require("../helpers/db-validators");

//Muestra toda la data
router.get("/", usuariosGet);

//Muestra la data de un solo usuario
router.get(
  "/:id",
  [
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosGetId
);

//Ingresa nueva data
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("apellido", "El apellido es obligatorio").not().isEmpty(),
    check("email", "No es un correo valido").isEmail(),
    //check custom
    check("email").custom(emailExiste),
    check("password", "El password es obligatorio").not().isEmpty(),
    check("password", "El password debe tener 5 caracteres minimo").isLength({
      min: 5,
    }),
    check("rol", "No es un rol valido").isIn(["USER_ROLE", "ADMIN_ROLE"]),
    validarCampos,
  ],
  usuariosPost
);

//Edita la data
router.put(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

//Elimina los datos
router.delete(
  "/:id",
  [
    validarJWT,
    esAdminRole,
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosDel
);

module.exports = router;
