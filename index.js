require("dotenv").config();
const express = require("express");
const massive = require("massive");
const products_controller = require("./products_controller");

const app = express();

const { PORT, CONNECTION_STRING } = process.env;

massive(CONNECTION_STRING)
  .then(dbInstance => {
    app.set("db", dbInstance);
  })
  .catch(err => console.log(err));

app.use(express.json());

app.post("/api/products", products_controller.create);
app.get("/api/products", products_controller.getAll);
app.get("/api/products/:id", products_controller.getOne);
app.put("/api/products/:id", products_controller.update);
app.delete("/api/products/:id", products_controller.delete);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
