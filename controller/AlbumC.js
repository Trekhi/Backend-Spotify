const  Album  = require("../models/album");
const { response } = require("express");

const obtenerAlbulmes = async (req, res = response) => {
  const { desde = 0 } = req.query;

  try {
    const [total, album] = await Promise.all([
      Album.countDocuments(),
      Album.find({})
        .skip(Number(desde))
        .sort({ nombre: 1 }) // Ordenamos por nombre alfabéticamente
    ]);

    res.json({ Ok: true, total: total, resp: album });
  } catch (error) {
    console.error("Error al obtener albumes:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

module.exports = { obtenerAlbulmes };