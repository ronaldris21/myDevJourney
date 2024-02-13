import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./config/MongoDb.js";
import { errorHandler, notFound, logErrors } from "./Middleware/Errors.js";
import routes from "./Routes/Routes.js";
import cors from "cors";

// video
// import swaggerDocs from "./swagger.js";

import swagger from "./swagger.js";

// ///SWAGGER CONFIG
// console.log("xdd")
// import swaggerUi from 'swagger-ui-express';
// console.log("xdd")
// import swaggerDocument from './swagger.json' assert {type: "json"};
// import swaggerJsdoc from "swagger-jsdoc";
// // Define las opciones de configuración para Swagger
// const options = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'My API',
//       version: '1.0.0',
//       description: 'Descripción de mi API',
//     },
//     servers: [
//       {
//         url: 'http://localhost:5004/api/v1',
//         description: 'Servidor local',
//       },
//     ],
//   },
//   apis: ['./Routes/*.js'], // Rutas donde se encuentran las definiciones de las API
// };

// // Genera la documentación de Swagger
// const specs = swaggerJsdoc(options);

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());


///CORS
app.use(cors());

//ROUTES
routes(app);

app.get("/", (req, res) => {
  res.send('BIENVENIDO - BACKEND EN FUNCIONAMIENTO <a href="/docs">documentacion</a>');
});

// Middleware de error despues del Routing
app.use(logErrors);
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5004;

app.listen(PORT, async()=>{
  console.log(`server run in port http://localhost:${PORT}`)
  // swaggerDocs(app, PORT);
  swagger(app,PORT);
});


// app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
console.log("xdd")


export default app