const  Favorito  = require("../models/favorito");
const { response } = require("express");

const obtenerFavorito = async (req, res = response) => {
  const { desde = 0 } = req.query;

  try {
    const [total, favoritos] = await Promise.all([
      Favorito.countDocuments(),
      Favorito.find({})
        .skip(Number(desde))
        .sort({ nombre: 1 })
    ]);

    res.json({ Ok: true, total: total, resp: favoritos });
  } catch (error) {
    console.error("Error al obtener los favoritos:", error);
    res.status(500).json({ Ok: false, resp: error.message });
  }
};

const agregarfavorito = async (req, res= response) => {
  const { titulo } = req.params;
  try {
    const cancion = await Favorito.findOne({ titulo })
    .populate("artista", "nombre nacionalidad")
    .populate("genero", "nombre");

    if (!cancion) {
      return res.status(400).json({ error: "cancion no encontrada" });
    }

    const nuevaCancion = new Favorito(cancion);
    await nuevaCancion.save();

    res.json({ data: nuevaCancion });
  } catch (error) {
    console.error("Error en agregar cancion:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


  const eliminarFavorito = async (req, res) => {
    try {
      const {titulo} = req.params;
  
      if (!titulo) {
        return res
          .status(400)
          .json({
            error: "titulo de la cancion no encontrado",
          });
      }
  
      const cancionEliminada = await Favorito.deleteOne({ titulo });
  
      if (!cancionEliminada) {
        return res.status(404).json({ error: "cancion no eliminada" });
      }
  
      res.json({ message: "cancion eliminada exitosamente" });
    } catch (error) {
      console.error("Error en eliminar canción:", error);
      res.status(500).json({ error: "Error interno del servidor" });
    }
  };
  

  module.exports={obtenerFavorito,agregarfavorito, eliminarFavorito }
