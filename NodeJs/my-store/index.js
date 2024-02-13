const express = require("express");
const app = express();
const port = 3002;

///USO DE JSON
app.use(express.json());

///Enrutamiento
const apiV1 = require("./routes/v1/apiRouter");
const apiV2 = require("./routes/v2/apiRouter");

//GENERAL
app.get('/', (req,res) =>{
  res.send("Hola mi server en express");
})



///ENRUTAMIENTO de versiones del api
apiV1(app);
apiV2(app);


///ACTIVAR
app.listen(port, () =>{
  console.log(`http://localhost:${port}`);
})

