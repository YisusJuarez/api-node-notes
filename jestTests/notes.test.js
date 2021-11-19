const mongoose = require('mongoose');
const supertest = require('supertest');
const {app, server} = require('../index');
const notesRouter = require("../controllers/notesController");

const api = supertest(app);
const Note = require('../models/NoteModel');
const initialNotes =[{
    userId:1,
    body:"Aprendiendo fullstack",
    title:"Nota de test"
},{
    userId:2,
    body:"Aprendiendo fullstack 2",
    title:"Nota de test"
}]

beforeEach(async () => {
    await Note.deleteMany({});

    const note1 = new Note(initialNotes[0]);
    await note1.save();

    const note2 = new Note(initialNotes[1]);
    await note2.save();
})

test.skip('notes return json',async ()=>{
    await api.get('/api/notes')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})


test.skip('there are two notes', async ()=>{
    const response = await api.get('/api/notes', notesRouter);
    expect(response.body).toHaveLength(initialNotes.length) 
})

afterAll(()=>{
    mongoose.connection.close();
    server.close();
})
