const mongoose = require("mongoose");

async function mongoconnection() {
  try {
    const uri = process.env.URI;
    await mongoose.connect(uri);
    console.log("Conexión realizada");
  } catch (error) {
    console.error("Error conectando con MongoDB:", error);
  }
}

module.exports = mongoconnection;