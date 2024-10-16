const { Router } = require("express");

const {
    cancionTitulo, 
    obtenerTodosCanciones, 
    cancionGenero
} = require("../controller/cancionC");

const router = Router();

router.get('/',obtenerTodosCanciones)
router.get('/titulo/:titulo',cancionTitulo)
router.get('/canciongenero/:genero',cancionGenero)

module.exports = router;