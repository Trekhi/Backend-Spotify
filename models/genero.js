const mongoose = require("mongoose");

const generoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
});

const Genero = mongoose.model("Genero", generoSchema);

module.exports = Genero;
