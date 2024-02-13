const express = require("express");
const router = express.Router();

var users = [
  { id: 1, nombre: "Ronald Ris", edad: 23 },
  { id: 2, nombre: "Ana López", edad: 29 },
  { id: 3, nombre: "Carlos González", edad: 42 },
  { id: 4, nombre: "María Pérez", edad: 37 },
  { id: 5, nombre: "David Sánchez", edad: 18 },
  { id: 6, nombre: "Laura Gómez", edad: 27 },
  { id: 7, nombre: "José Hernández", edad: 31 },
  { id: 8, nombre: "Isabel Ruiz", edad: 25 },
  { id: 9, nombre: "Manuel Martínez", edad: 50 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
  { id: 10, nombre: "Marta Fernández", edad: 21 },
];



router.get("/",(req,res) =>{
  res.json(users);
})

router.get("/:id",(req,res) =>{
  const id = req.params.id;
  let cantInicial = users.length;
  users = users.filter(u=>u.id!=id);

  if(cantInicial == users.length)
  {
    res.send("No existe el id a eliminar");
  }
  else
  {
    res.send("Usuario eliminado! id: "+id );
  }
})


module.exports = router;
