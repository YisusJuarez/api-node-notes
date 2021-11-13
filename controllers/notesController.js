const notesRouter = require("express").Router();
const Note = require("../models/NoteModel");
/* Get all notes */
notesRouter.get("/", async (request, response) => {
  try {
    const notes = await Note.find({});
    response.json(notes);
  } catch (error) {
    next(error);
  }
});
/* Post a new note */
notesRouter.post("/", async (request, response, next) => {
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
/* Get note by id */
notesRouter.get("/:id", async (request, response, next) => {
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
notesRouter.delete("/:id", async (request, response, next) => {
  const { id } = request.params;
  Note.findByIdAndDelete(id)
    .then((nota) => {
      if (nota) {
        response.json(nota);
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});
/*Put for editing note by id */
notesRouter.put("/:id", (request, reponse, next) => {
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

module.exports = notesRouter;
