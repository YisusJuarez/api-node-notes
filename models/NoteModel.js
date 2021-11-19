const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  title: String,
  body: String,
  user:{
    type:Schema.Types.ObjectId,
    ref:'User'
  }
});


//El nombre de la colección preferencia en singular
const Note = model("Note", noteSchema);

noteSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = Note;