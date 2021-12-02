require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/loggerMiddleware");
const middlewareNotFound = require("./middlewares/notFoundMiddleware");
const usersRouter = require("./controllers/usersController");
const notesRouter = require("./controllers/notesController");
const loginRouter = require('./controllers/loginController');

const app = express();

/* BD Mongo*/
require("./mongo.js");
app.use(cors());
app.use(express.json());
/* Servir imagenes estaticas de la carpeta images*/
app.use('/images',express.static('./images'));
app.use(logger);

/* Base endpoint */
app.get("/", (request, response) => {
  response.send("<h1>Hello,this is an Api example</h1>");
});

/* notes */
app.use("/api/notes",notesRouter);

// Users Create user
app.use('/api/users', usersRouter)

// login
app.use('/api/login', loginRouter)

/* Next Error handler*/
app.use((error, request, response, next) => {
  console.log(error);
  console.log(error.name);
  if (error.name === "CastError") {
    response.status(400).send({error:"Id no encontrado"});
  }else if(error.name === "JsonWebTokenError") {
    response.status(401).json({error:"JWT invalido"})
  }
  else {
    response.status(500).send({error:"Ocurrio un error"});
  }
});

/* 404 middleware*/
app.use(middlewareNotFound);


/*Port config*/
const PORT = process.env.PORT;

/* Listen for mounting the API on the previus port*/
const server = app.listen(PORT, () => {
  console.log("Server Running", PORT);
  console.log("Env", process.env.NODE_ENV);
});

process.on("uncaughtException",()=>{
  mongoose.connection.disconnect();
})

module.exports = {app, server};
