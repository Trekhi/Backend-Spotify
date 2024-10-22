const mongoose = require("mongoose");

async function mongoconnection() {
  try {
    const uri = process.env.URI;
    await mongoose.connect(uri, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    // const connection = mongoose.connection;
    // console.log("Conectado a la base de datos:", connection.name);
    console.log("Conexión realizada");
  } catch (error) {
    console.error("Error conectando con MongoDB:", error);
  }
}

module.exports = mongoconnection;