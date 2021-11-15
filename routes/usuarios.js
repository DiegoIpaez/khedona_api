const { Router } = require("express");
const { check } = require("express-validator");

const router = Router();

//Importo los controladores
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDel,
} = require("../controllers/usuarios");

//Importo las validaciones de campo
const { validarCampos } = require("../middlewares/validar-campos");
//Importo los check custom
const { emailExiste, idExiste } = require("../helpers/db-validators");

//Muestra toda la data
router.get("/", usuariosGet);

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
    check("id", "No es un id valido").isMongoId(),
    check("id").custom(idExiste),
    validarCampos,
  ],
  usuariosPut
);

//Elimina los datos
router.delete(
  "/:id",
  [check("id", "No es un id valido").isMongoId(), validarCampos],
  usuariosDel
);

module.exports = router;
