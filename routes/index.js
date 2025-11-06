const router = require("express").Router();


router.use("/users", require("./users"));
router.use('/', require('./swagger'));
router.get("/", (req, res) => {
  // #swagger.tags = ['Hello World']
  res.send("Hello world!");
});



module.exports = router;
