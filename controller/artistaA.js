const  Artista  = require("../models/artista");
const { response } = require("express");

const obtenerArtista = async (req, res = response) => {
  const { desde = 0 } = req.query;

  try {
    const [total, artistas] = await Promise.all([
      Artista.countDocuments(),
      Artista.find({})
        .skip(Number(desde))
        .sort({ nombre: 1 }) // Ordenamos por nombre alfabéticamente
    ]);

    res.json({ Ok: true, total: total, resp: artistas });
  } catch (error) {
    console.error("Error al obtener los artistas:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

const obtenerArtistaPorId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const artista = await Artista.findById(id);

    if (!artista) {
      return res.status(404).json({ Ok: false, resp: "Artista no encontrado" });
    }

    res.json({ Ok: true, artista: artista });
  } catch (error) {
    console.error("Error al obtener el artista:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

const obtenerArtistaPorNombre = async (req, res = response) => {
  const { nombre } = req.params;

  try {
    const artista = await Artista.findOne({ nombre: nombre });

    if (!artista) {
      return res.status(404).json({ Ok: false, resp: "Artista no encontrado" });
    }

    res.json({ Ok: true, artista: artista });
  } catch (error) {
    console.error("Error al obtener el artista:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

module.exports = { obtenerArtista, obtenerArtistaPorId, obtenerArtistaPorNombre };
