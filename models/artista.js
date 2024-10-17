const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nacionalidad: { type: String },
  imagen: { type: String, required: true }, 
});

const Artista = mongoose.model("Artista", artistaSchema);

module.exports = Artista;
