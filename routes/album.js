const { Router } = require("express");


const router = Router();

const {
    obtenerAlbulmes,
    albumTitulo,
    albumsPorNombreGenero,
    albumsPorNombreArtista
} = require("../controller/AlbumC");
;

router.get('/',obtenerAlbulmes)
router.get('/albumTiulo/:titulo' , albumTitulo)
router.get('/albumGenero/:genero' , albumsPorNombreGenero)
router.get('/albumArtista/:artista' , albumsPorNombreArtista)

module.exports = router;