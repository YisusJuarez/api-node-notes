const { Schema, model } = require("mongoose");

const noteSchema = new Schema({
  userId: Number,
  title: String,
  body: String,
});

const Note = model("Note", noteSchema);

noteSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
    }
})
/*Note.find({}).then((res) => {
  console.log(res);
  mongoose.connection.close();
});*/

module.exports = Note;