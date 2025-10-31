const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");

console.log(ObjectId);

// const getAll = async (req, res) => {
//   const result = await mongodb.getDB().db().collection("users").find();
//   result.toArray().then((users) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(users);
//   });
// };

const getAll = async (req, res) => {
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

// const getById = async (req, res) => {
//   console.log("ID recibido:", req.params.id);
//   console.log("Longitud:", req.params.id?.length);
//   console.log("Tipo:", typeof req.params.id);
//   const userId = new ObjectId(req.params.id);
//   result = await mongodb.getDB().db().collection("users").find({ _id: userId });
//   result.toArray().then((users) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(users[0]);
//   });
// };

const getById = async (req, res) => {
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

module.exports = {
  getAll,
  getById,
};
