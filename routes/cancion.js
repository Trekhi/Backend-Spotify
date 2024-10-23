const { Router } = require("express");

const {
    cancionTitulo,
    obtenerCancionPorId,
    obtenerTodosCanciones, 
    cancionGenero,
    cancionArtista
} = require("../controller/cancionC");

const router = Router();

router.get('/',obtenerTodosCanciones)
router.get('/:id',obtenerCancionPorId)
router.get('/titulo/:titulo',cancionTitulo)
router.get('/canciongenero/:genero',cancionGenero)
router.get('/cancionArtista/:artista', cancionArtista)

module.exports = router;