const mongoose = require("mongoose");

const artistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  nacionalidad: { type: String },
});

const Artista = mongoose.model("Artista", artistaSchema);

module.exports = Artista;
