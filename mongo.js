/*Mongo db config*/
const mongoose = require("mongoose");
const connectionString = process.env.MONGO_DB_URI;

//conexión a mongo db
mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((err) => {
    console.error("Error en la conexión");
    console.log(err);
  });
