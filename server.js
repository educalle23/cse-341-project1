const express = require("express");
const app = express();
const mongodb = require("./data/database");
const usersRoutes = require("./routes/users");
const indexRouter = require("./routes/index");

const port = process.env.PORT || 3000;

app.use("/", indexRouter);
app.use("/users", usersRoutes);

mongodb.initDB((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node is running on port ${port}`);
    });
  }
});
