// Import the necessary dependencies
import express from "express";

import pkg from 'transformers';
const { AutoModelForCausalLM } = pkg;

// Create an Express application
const app = express();

// Load the Transformers model
const model = new AutoModelForCausalLM.frompretrained("metaresearch/llama-2");

// Define a route that will generate text using the Transformers model
app.get("/request", async (req, res) => {
  // Get the input text from the request query parameters
  const inputText = req.query.text;

  // Generate text using the Transformers model
  const outputText = await model.generate(inputText, max_length = 50);

  // Send the generated text back to the client
  res.send(200, { result: outputText });
});

// Start the Express application
app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  console.log("http://localhost:3000");
});
