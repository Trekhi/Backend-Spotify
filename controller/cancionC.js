const { Cancion } = require("../models"); 
const { response } = require("express");

const cancionTitulo = async (req, res = response) => {
  const { titulo } = req.params;

  try {
    const cancion = await Cancion.findOne({ titulo })
      .populate("artista", "nombre nacionalidad")
      .populate("genero", "nombre");

    if (!cancion) {
      return res.status(404).json({ ok: false, resp: "Canción no encontrada" });
    }

    return res.status(200).json({
      ok: true,
      cancion,
    });
  } catch (error) {
    console.error("Error al buscar la canción:", error);
    return res.status(500).json({
      ok: false,
      resp: "Error al buscar la canción, inténtalo de nuevo",
    });
  }
};

module.exports = { cancionTitulo };
