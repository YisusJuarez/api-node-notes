require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./middlewares/loggerMiddleware");
const middlewareNotFound = require("./middlewares/notFoundMiddleware");
const app = express();

/* BD Mongo*/
require("./mongo.js");
const Note = require("./models/Note");


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
app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((err) => console.log(err));
});

/* Get note by id */
app.get("/api/notes/:id", (request, response, next) => {
  const { id } = request.params;
  console.log(id);
  Note.findById(id)
    .then((nota) => {
      if (nota) {
        response.json(nota);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => {
      next(err);
    });
});

/* Delete note by id */
app.delete("/api/notes/:id", (request, response, next) => {
  const {id} = request.params;
  Note.findByIdAndDelete( id ).then((nota) => {
    if (nota) {
      response.json(nota);
    } else {
      response.status(404).end();
    }
  }).catch(err => next(err))
});

/* Post create a note*/
app.post("/api/notes", (request, response) => {
  const data = request.body;
  const newNote = {
    userId: 1,
    title: data.title,
    body: data.body,
  };
  const note = new Note(newNote);

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote);
    })
    .catch((err) => console.log(err));
 
});

/*Put for editing note by id */
app.put("/api/notes/:id", (request, reponse, next) => {
  const {id} = request.params;
  const note = request.body;
  const newNoteInfo = {
    title: note.title,
    body: note.body,
  };
  
  Note.findByIdAndUpdate(id, newNoteInfo, {new:true})
  .then((res) => {
    if (res) {
      reponse.json(res);
    } else {
      reponse.status(404).end();
    }
  })
})
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
app.listen(PORT, () => {
  console.log("Server Running", PORT);
});

process.on("uncaughtException",()=>{
  mongoose.connection.disconnect();
})
