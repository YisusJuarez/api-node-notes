/*Mongo db config*/
const mongoose = require("mongoose");
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = process.env;
const connectionString = NODE_ENV === 'test' || NODE_ENV == 'development'? MONGO_DB_URI_TEST : MONGO_DB_URI;

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
