const express = require("express");
const notes = require("./data");
const logger = require("./loggerMiddleware");
const cors = require('cors')

const app = express();

app.use(cors())
app.use(express.json)
app.use(logger);

app.get("/", (request, response) => {
  response.send("Hi bro");
});

app.get("/api/notes", (request, response, next) => {
  response.json(notes);
  next();
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);

  const note = notes.find((n) => n.id === id);

  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((e) => e.id !== id);
  response.status(204).end();
});

app.use(() => {
  console.log("He entrado aqui");
});


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server Running");
});