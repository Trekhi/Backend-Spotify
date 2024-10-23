const  Album  = require("../models/album");
const Genero = require("../models/genero");
const Artista = require("../models/artista");

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

const obtenerAlbumPorId = async (req, res = response) => {
  const { id } = req.params;

  try {
    const album = await Album.findById(id)
      .populate("artista", "nombre nacionalidad")
      .populate("genero", "nombre");

    if (!album) {
      return res.status(404).json({ Ok: false, resp: "Álbum no encontrado" });
    }

    res.json({ Ok: true, album: album });
  } catch (error) {
    console.error("Error al obtener álbum:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

const albumTitulo = async (req, res = response) => {
  const { titulo } = req.params;

  try {
    const album = await Album.findOne({ titulo })
      .populate("artista", "nombre nacionalidad")
      .populate("genero", "nombre");

    if (!album) {
      return res.status(404).json({ ok: false, resp: "Álbum no encontrado" });
    }

    return res.status(200).json({
      ok: true,
      album, 
    });
  } catch (error) {
    console.error("Error al buscar el álbum:", error);
    return res.status(500).json({
      ok: false,
      resp: "Error al buscar el álbum, inténtalo de nuevo",
    });
  }
};

const albumsPorNombreGenero = async (req, res = response) => {
  const { genero } = req.params;

  try {
    // Buscar el género por su nombre
    const generoEncontrado = await Genero.findOne({ nombre: genero });

    if (!generoEncontrado) {
      return res.status(404).json({ ok: false, resp: "Género no encontrado" });
    }

    // Buscar todos los álbumes asociados al ID del género
    const albums = await Album.find({ genero: generoEncontrado._id })
      .populate("artista", "nombre nacionalidad")
      .populate("genero", "nombre");

    if (albums.length === 0) {
      return res.status(404).json({ ok: false, resp: "No se encontraron álbumes para el género especificado" });
    }

    return res.status(200).json({
      ok: true,
      albums,
    });
  } catch (error) {
    console.error("Error al buscar álbumes por género:", error);
    return res.status(500).json({
      ok: false,
      resp: "Error al buscar los álbumes, inténtalo de nuevo",
    });
  }
};

const albumsPorNombreArtista = async (req, res = response) => {
  const { artista } = req.params;

  try {
    // Buscar el artista por su nombre
    const artistaEncontrado = await Artista.findOne({ nombre: artista });

    if (!artistaEncontrado) {
      return res.status(404).json({ ok: false, resp: "Artista no encontrado" });
    }

    // Buscar todos los álbumes asociados al ID del artista
    const albums = await Album.find({ artista: artistaEncontrado._id })
      .populate("artista", "nombre nacionalidad")
      .populate("genero", "nombre");

    if (albums.length === 0) {
      return res.status(404).json({ ok: false, resp: "No se encontraron álbumes para el artista especificado" });
    }

    return res.status(200).json({
      ok: true,
      albums,
    });
  } catch (error) {
    console.error("Error al buscar álbumes por artista:", error);
    return res.status(500).json({
      ok: false,
      resp: "Error al buscar los álbumes, inténtalo de nuevo",
    });
  }
};




module.exports = { obtenerAlbulmes, obtenerAlbumPorId, albumTitulo, albumsPorNombreGenero, albumsPorNombreArtista };