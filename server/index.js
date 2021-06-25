const express = require("express");

const app = express();
app.use(express.json({ extended: false }));

const port = process.env.PORT || 5000;

// Database routes
app.use("/users", require("./db/users"));
app.use("/checked-out-books", require("./db/checked-out-books"));
app.use("/books", require("./db/books"));

// App routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/books", require("./routes/api/books"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => {
  res.send("Welcome to BibliotecaV1");
});
app.listen(port, () => console.log(`The server is listening on PORT ${port}`));
