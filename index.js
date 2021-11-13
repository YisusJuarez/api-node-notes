require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/loggerMiddleware");
const middlewareNotFound = require("./middlewares/notFoundMiddleware");
const usersRouter = require("./controllers/usersController");
const notesRouter = require("./controllers/notesController");
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

/* Get all notes */
app.use("/api/notes",notesRouter);

/* Get note by id */
app.use("/api/notes", notesRouter);

/* Delete note by id */
app.use("/api/notes", notesRouter);

/* Post create a note*/
app.use("/api/notes", notesRouter);

/*Put for editing note by id */
app.use("/api/notes",notesRouter)

// Users Create user
app.use('/api/users', usersRouter)

/* Next Error handler*/
app.use((error, request, response, next) => {
  console.log(error);
  console.log(error.name);
  if (error.name == "CastError") {
    response.status(400).send({error:"Id no encontrado"});
  } else {
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
