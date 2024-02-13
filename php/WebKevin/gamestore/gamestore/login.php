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
      <input type="email" id="email" class="fadeIn second" name="email" maxlength="50" placeholder="Correo Electrónico" required="required">
      <input type="password" id="password" class="fadeIn third" name="password" maxlength="30" placeholder="Contraseña" required="required">
      <input type="submit" class="fadeIn fourth" name="login" value="Entrar">
    </form>

    <!-- Remind Passowrd -->
    <section id="formFooter">
     ¿No tienes una cuenta? <a class="underlineHover" href="?p=register.php">Registrate</a>
    </section>

  </section>
</section>