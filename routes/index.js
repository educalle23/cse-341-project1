const router = require("express").Router();


// router.get("/users", require("./users"));

router.get("/", (req, res) => {
  res.send("Hello world o k locazo!");
});



module.exports = router;
