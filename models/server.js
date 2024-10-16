const express = require("express"); // levanta servicio de express

const mongoconnection = require("../database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.pathsMongo = {
      genero: "/Genero",
      artista: "/Artista",
      cancion: "/Cancion",
      favorito: "/Favorito"
    };

    this.mongoconnection();
    //Routes
    this.routesM();
  }

  async mongoconnection() {
    await mongoconnection();
  }

  routesM() {
    this.app.use(this.pathsMongo.genero, require("../routes/Genero"));
    this.app.use(this.pathsMongo.artista, require("../routes/artista"));
    this.app.use(this.pathsMongo.cancion, require("../routes/cancion"));
    this.app.use(this.pathsMongo.favorito, require("../routes/favorito"));
    
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("SERVIDOR CORRIENDO EN PUERTO", this.port);
    });
  }
}

module.exports = Server;