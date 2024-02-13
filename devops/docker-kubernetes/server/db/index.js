const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URL || "mongodb://localhost:27017/cinema" ;
console.log("connectionString")
console.log(connectionString)
console.log(connectionString)

mongoose.connect(connectionString, { useNewUrlParser: true }).catch((e) => {
  console.error('Connection error', e.message);
});

const db = mongoose.connection;

module.exports = db;
