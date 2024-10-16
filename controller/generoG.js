const  Genero  = require("../models/genero");
const { response } = require("express");

const obtenerGenero = async (req, res = response) => {
  const { desde = 0 } = req.query;

  try {
    const [total, generos] = await Promise.all([
      Genero.countDocuments(),
      Genero.find({})
        .skip(Number(desde))
        .sort({ nombre: 1 }) // Ordenamos por nombre alfabéticamente
    ]);

    res.json({ Ok: true, total: total, resp: generos });
  } catch (error) {
    console.error("Error al obtener los generos:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

module.exports = { obtenerGenero };