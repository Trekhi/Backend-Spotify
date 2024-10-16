const { Router } = require("express");

const {
    obtenerFavorito,
    agregarfavorito,
    eliminarFavorito
} = require("../controller/favoritoF");

const router = Router();

router.get('/',obtenerFavorito)
router.get('/favoritos/:titulo',agregarfavorito)
router.delete('/eliminar/:titulo',eliminarFavorito)


module.exports = router;