const notesRouter = require("express").Router();
const Note = require("../models/NoteModel");
const User = require('../models/UserModel');
const userExtractor = require('../middlewares/userExtractor')
const jwt = require('jsonwebtoken')
/* Get all notes */
notesRouter.get("/", async (request, response, next) => {
  try {
    const notes = await Note.find({}).populate('user',{userName:1, name:1});
    response.json(notes);
  } catch (error) {
    next(error);
  }
});
/* Post a new note */
notesRouter.post("/", userExtractor, async (request, response, next) => {
  const {title, body} =request.body
  const {userId} = request

  const user = await User.findById(userId)
  console.log(user)
  const newNote = {
    title: title,
    body: body,
    user:user._id
  };
  
  const note = new Note(newNote);
  await note.save()
  

  user.notes = user.notes.concat(note._id)
  await user.save()
  .then((user) => {
    response.json(user);
  })
  .catch(err => console.log(err))
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
notesRouter.delete("/:id", userExtractor, async (request, response, next) => {
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
notesRouter.put("/:id", userExtractor,  (request, reponse, next) => {
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
