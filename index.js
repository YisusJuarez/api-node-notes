require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("./loggerMiddleware");
const app = express();

/* BD Mongo*/
require("./mongo.js");
const Note = require("./models/Note");
const { connection } = require("mongoose");

app.use(cors());
app.use(express.json());
app.use(logger);

app.get("/", (request, response) => {
  response.send("<h1>Hello Yisus</h1>");
});

app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((res) => {
      console.log(res);
      response.json(res);
    })
    .catch((err) => console.log(err));
});

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

app.delete("/api/notes/:id", (request, response, next) => {
  const {id} = request.params;
  Note.findByIdAndDelete({ id }).then((nota) => {
    if (nota) {
      response.json(nota);
    } else {
      response.status(404).end();
    }
  }).catch(err => next(err))
});

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
  connection.close();
});

app.use((error, request, response, next) => {
  console.log(error);
  console.log(error.name);
  if (error.name == "CastError") {
    response.status(400).send({error:"Id no encontrado"});
  } else {
    reponse.status(500).send({error:"Ocurrio un error"});
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("Server Running", PORT);
});
