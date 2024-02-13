<?php
    @session_start();
    if(empty($principal) || isset($_SESSION['user'])){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<section class="wrapper fadeInDown">
  <section id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <section class="fadeIn first">
      <img src="./images/gamestore.png" id="icon" alt="User Icon" />
    </section>

    <!-- Login Form -->
    <form action="validar.php" method="post" class="container">
      <input type="text" id="nombre" name="nombre" maxlength="20" class="fadeIn second" placeholder="Nombre" required="required">
      <input type="text" id="apellidos" name="apellidos" maxlength="35" class="fadeIn second" placeholder="Apellidos" required="required">
      <input type="email" id="login" class="fadeIn second" name="email" maxlength="50" placeholder="Correo Electrónico" required="required">
      <input type="password" id="password" class="fadeIn third" name="password" maxlength="30" placeholder="Contraseña" required="required">
      <input type="submit" name="register" class="fadeIn fourth" value="Registrarme">
    </form>

    <!-- Remind Passowrd -->
    <section id="formFooter">
     ¿Ya tienes una cuenta? <a class="underlineHover" href="?p=login.php">Inicia sesión</a>
    </section>

  </section>
</section>