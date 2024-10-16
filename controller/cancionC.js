const { Cancion} = require("../models/cancion");
const { Genero} = require("../models/genero");
const { response } = require("express");

const obtenerTodosCanciones = async (req, res = response) => {
  try {
    const total = await Cancion.countDocuments();
    const canciones = await Cancion.find();

    res.json({ Ok: true, total: total, canciones: canciones });
  } catch (error) {
    console.error(error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

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


const cancionGenero = async (req, res = response) => {
  const { genero } = req.params;

  try {
    const generoEncontrado = await Genero.findOne({ nombre: genero });

    if (!generoEncontrado) {
      return res.status(404).json({ ok: false, resp: "Género no encontrado" });
    }

    const canciones = await Cancion.find({ genero: generoEncontrado._id })
      .populate("artista", "nombre nacionalidad") 
      .populate("genero", "nombre"); 

    if (canciones.length === 0) {
      return res.status(404).json({ ok: false, resp: "No se encontraron canciones para este género" });
    }

    return res.status(200).json({
      ok: true,
      canciones,
    });
  } catch (error) {
    console.error("Error al buscar las canciones por género:", error);
    return res.status(500).json({
      ok: false,
      resp: "Error al buscar las canciones, inténtalo de nuevo",
    });
  }
};


module.exports = { cancionTitulo, obtenerTodosCanciones, cancionGenero };
