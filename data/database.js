const dotenv = require("dotenv");
dotenv.config();

const mongoclient = require("mongodb").MongoClient;

let database;

const initDB = (callback) => {
  if (database) {
    console.log("Database is already initialized!");
    return callback(null, databse);
  }
  mongoclient
    .connect(process.env.MONGODB_URL)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((error) => {
      callback(error);
    });
};

const getDB = () => {
  if (!database) {
    throw Error("Database not initialized");
  }
  return database;
};

module.exports = {
  initDB,
  getDB,
};
