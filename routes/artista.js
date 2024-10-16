const { Router } = require("express");

const {
    obtenerArtista
} = require("../controller/artistaA");

const router = Router();

router.get('/',obtenerArtista)

module.exports = router;