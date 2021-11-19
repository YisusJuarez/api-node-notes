const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/UserModel');

usersRouter.get('/', async (request, response)=>{
    const allUsers = await User.find({}).populate('notes',{title:1, body:1})
    response.json(allUsers)
})
usersRouter.post('/', async (request, response)=>{
    const {body} = request;
    const {username, name, password} = body;
    const passwordHash = await bcrypt.hash(password, 10)
    const user = new User({
        userName: username,
        name,
        passwordHash
    })
    
    const savedUser = await user.save();
    response.status(201).json(savedUser);
})



module.exports = usersRouter;