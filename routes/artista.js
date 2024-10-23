const { Router } = require("express");

const {
    obtenerArtista,
    obtenerArtistaPorId,
    obtenerArtistaPorNombre
} = require("../controller/artistaA");

const router = Router();

router.get('/',obtenerArtista)
router.get('/:id',obtenerArtistaPorId)
router.get('/nombre/:nombre', obtenerArtistaPorNombre)

module.exports = router;