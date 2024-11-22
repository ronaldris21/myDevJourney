// import * as express from "express";
import express from "express";
import _ from "lodash"

const PORT: string | number = process.env.port || 1337;

const app = express() ;

app.listen(PORT);
app.use(express.static("public"));

console.log("Listening on port: "+PORT);


function returnString(num:number){
    return num.toFixed(4);

}