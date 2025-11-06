const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
  // swagger.tags = ['Users']
  try {
    const result = await mongodb.getDB().db().collection("users").find();
    const users = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error en getAll:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};


const getById = async (req, res) => {
  // swagger.tags = ['Users']
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const userId = new ObjectId(req.params.id);
    const user = await mongodb
      .getDB()
      .db()
      .collection("users")
      .findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getById:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const createUser = async (req, res) => {
  //swagger.tags = ['Users']
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongodb.getDB().db().collection("users").insertOne(user);
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res.status(500).json(response.error || "Some error occurred while creating the user.");
  }
};

const updateUser = async (req, res) => {
  //swagger.tags = ['Users']
  const userId = new ObjectId(req.params.id);
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  }
  const response = await mongodb.getDB().db().collection("users").replaceOne({ _id: userId }, user);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while updating the user.");
  }
};

const deleteUser = async (req, res) => {
  //swagger.tags = ['Users']
  const userId = new ObjectId(req.params.id);
  const response = await mongodb.getDB().db().collection("users").deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || "Some error occurred while deleting the user.");
  }
};

module.exports = {
  getAll,
  getById,
  createUser,
  updateUser, 
  deleteUser
};
