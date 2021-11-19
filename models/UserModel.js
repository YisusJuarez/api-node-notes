const {Schema, model} = require('mongoose');
const mongooseUniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({ 
    userName:String,
    name:String,
    passwordHash:String,
    notes:[{type:Schema.Types.ObjectId, ref:'Note'}]
});

userSchema.set('toJSON',{
    transform:(document, returnedObject)=>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})



const User = model("User", userSchema);



module.exports = User;