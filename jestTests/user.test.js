const User = require("../models/UserModel");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { app, server } = require("../index");
const supertest = require("supertest");
const api = supertest(app);

describe("Validando Usuario creado", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("contrañadejemplo", 10);

    const newUser = new User({
      userName: "juan",
      name: "Juan",
      passwordHash: passwordHash,
    });
    await newUser.save();
  });

  test("Expect creando usuario nuevo", async () => {
    const usersDb = await User.find({});
    const usersAtStart = usersDb.map((user) => {
      return user.toJSON();
    });

    const newUserApi = {
      username: "LGsus",
      name: "YisusPhone",
      password: "tw1tch",
    };

    await api
      .post("/api/users")
      .send(newUserApi)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersDbAfter = await User.find({});
    const usersAtEnd = usersDbAfter.map((user) => user.toJSON());
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    const usernames = usersAtEnd.map((user) => user.userName);
    expect(usernames).toContain(newUserApi.username);
  });

  test("creation fails with proper status code and message if username is already taken", async () => {
      const usersAtStart = await User.find({})
      const newUser = new User({
        username: "juan",
        name: "Juan",
        password: 'yisustest',
      });

      const sendUser = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/)
      
      expect(sendUser.body.error).toContain('username to be unique')
      const usersAtEnd = await User.find({})
      expect(usersAtEnd).toHaveLength(usersAtStart.length)
      
  });

  afterAll(() => {
    mongoose.connection.close();
    server.close();
  });
});
