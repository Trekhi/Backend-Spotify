const express = require("express"); // levanta servicio de express
const cors = require('cors')

const mongoconnection = require("../database/connection");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.pathsMongo = {
      genero: "/Genero",
      artista: "/Artista",
      cancion: "/Cancion",
      favorito: "/Favorito",
      album: "/Album"
    };

    this.mongoconnection();
    this.app.use(cors());

    //Routes
    this.routesM();
  }

  async mongoconnection() {
    await mongoconnection();
  }

  routesM() {
    this.app.use(this.pathsMongo.genero, require("../routes/genero"));
    this.app.use(this.pathsMongo.artista, require("../routes/artista"));
    this.app.use(this.pathsMongo.cancion, require("../routes/cancion"));
    this.app.use(this.pathsMongo.favorito, require("../routes/favorito"));
    this.app.use(this.pathsMongo.album, require("../routes/album"));
    
  }


  listen() {
    this.app.listen(this.port, () => {
      console.log("SERVIDOR CORRIENDO EN PUERTO", this.port);
    });
  }
}

module.exports = Server;