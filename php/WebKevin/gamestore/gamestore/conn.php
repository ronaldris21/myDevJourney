<?php
function db_connect() {

   $server = "localhost";
   $user = "root";
   $pass = "";
   $database = "gamestore";

   $conn = new mysqli($server, $user, $pass, $database)
   	or die("Imposible conectar con $server");

   return $conn;
}
?>

