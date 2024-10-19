const { Router } = require("express");


const router = Router();

const {
    obtenerAlbulmes
} = require("../controller/AlbumC");
;

router.get('/',obtenerAlbulmes)


module.exports = router;