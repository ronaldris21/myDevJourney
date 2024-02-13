const express = require('express');
const app =  express();

app.get("/", inicio);
app.get("/cursos", cursos);


function inicio(req,res)
{
    res.send("Hello World");
}

function cursos(req,res)
{
    res.send("Estos son los <strong>cursos</strong>");
}




app.listen(3000);