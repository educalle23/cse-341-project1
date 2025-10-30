const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

console.log(ObjectId);

const getAll = async (req, res) => {
  const result = await mongodb.getDB().db().collection("users").find();
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  });
};
const getById = async (req, res) => {
  result = await mongodb.getDB().db().collection("users").find({ _id: userId });
  result.toArray().then((users) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users[0]);
  });
};

module.exports = {
  getAll,
  getById,
};
