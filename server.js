const express = require("express");
const app = express();
const mongodb = require("./data/database");
const usersRoutes = require("./routes/users");
const indexRouter = require("./routes/index");
const bodyparser = require("body-parser");

const port = process.env.PORT || 3001;

app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, OPTIONS'
  );
  next();
});


app.use("/", indexRouter);
// app.use("/users", require("./routes/users"));



mongodb.initDB((error) => {
  if (error) {
    console.log(error);
  } else {
    app.listen(port, () => {
      console.log(`Database is listening and Node is running on port ${port}`);
    });
  }
});
