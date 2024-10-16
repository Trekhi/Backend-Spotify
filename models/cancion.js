const mongoose = require("mongoose");

const cancionSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  url: { type: String, required: true },
  descripcion: { type: String, required: true }, // URL para la canción
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
  imagen: { type: String, required: true }, 
}); 

const Cancion = mongoose.model("Cancion", cancionSchema);

module.exports = Cancion;
