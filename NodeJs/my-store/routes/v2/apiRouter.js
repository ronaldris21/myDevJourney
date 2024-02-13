const express = require("express");

const productsRouter = require("./products.router");
const usersRouter = require("./users.router");

function routerApi(app){
  const routerv1 = express.Router();
  app.use("/api/v2", routerv1);

  routerv1.use("/products", productsRouter);
  routerv1.use("/users",usersRouter);
}
module.exports = routerApi;

//// TOMEN AGUA!!!! POR SU BIENESTAR!
