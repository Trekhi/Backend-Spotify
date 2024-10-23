const { Router } = require("express");


const router = Router();

const {
    obtenerAlbulmes,
    obtenerAlbumPorId,
    albumTitulo,
    albumsPorNombreGenero,
    albumsPorNombreArtista
} = require("../controller/AlbumC");
;

router.get('/',obtenerAlbulmes)
router.get('/:id',obtenerAlbumPorId)
router.get('/albumTitulo/:titulo' , albumTitulo)
router.get('/albumGenero/:genero' , albumsPorNombreGenero)
router.get('/albumArtista/:artista' , albumsPorNombreArtista)

module.exports = router;