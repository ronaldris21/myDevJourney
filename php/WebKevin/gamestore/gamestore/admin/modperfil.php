<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_SESSION['admin']) || empty($_SESSION['admin'])){
        ?> 
        <script> window.location= "./index.php"; </script>
        <?php
    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Perfil</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user">
                                <div class="form-group">
                                    <label>Nombre:</label>
                                    <input type="text" name="nombre" class="form-control form-control-user"  placeholder="Nombre de la categoria" required value="<?= $_SESSION['nombreA'] ?>">
                                </div>
                                <div class="form-group">
                                    <label>Apellidos:</label>
                                    <input type="text" name="apellidos" class="form-control form-control-user" placeholder="Describe la categoria" required value="<?= $_SESSION['apellidosA'] ?>">
                                </div>
                                <div class="form-group">
                                    <label>Correo Eletrónico:</label>
                                    <input type="email" name="email" class="form-control form-control-user" aria-describedby="emailHelp" placeholder="Correo electrónico" required value="<?= $_SESSION['emailA'] ?>">
                                </div>
                                <div class="form-group">
                                    <label>Contraseña:</label>
                                    <input type="password" name="password" class="form-control form-control-user" placeholder="Password" required value="<?= $_SESSION['passwordA'] ?>">
                                </div>
                                <input type="hidden" name="actionid" value="modperfil">
                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                    Guardar cambios
                                </button>                                        
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>                    
        </div>
    </div>
</div>
