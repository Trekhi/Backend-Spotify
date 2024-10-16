const { Router } = require("express");

const {
    obtenerGenero
} = require("../controller/generoG");

const router = Router();

router.get('/',obtenerGenero)

module.exports = router;