const mongoose = require("mongoose");

const AlbumSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
  },
  fecha_lanzamiento: Date,
  artista: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artista", 
    required: true,
  },
  genero: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Genero", 
    required: true,
  },
  canciones: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cancion", // Referencia al modelo de Cancion
    },
  ],
  imagen: { type: String, required: true }, 
});

const Album = mongoose.model("Album", AlbumSchema);

module.exports = Album;
