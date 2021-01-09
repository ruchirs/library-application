if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const booksRouter = require("./routes/books");
const userRouter = require("./routes/user");
const cors = require("cors")
const app = express();

app.use(express.static("public"));
app.use(express.json());
// app.use(cors);

mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("connected to mongoose"));

app.use("/api/", indexRouter);
app.use("/api/books", booksRouter);
app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5000);
