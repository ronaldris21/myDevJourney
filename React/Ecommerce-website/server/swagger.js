
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "Description of my API",
    },
    servers: [
      {
        url: "http://localhost:5004",
        description: "Development server",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default function (app, PORT) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  console.log("documentation at: http://localhost:"+PORT+"/api-docs")
}

