<?php
    if(empty($principal)){
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
                    <h6 class="m-0 font-weight-bold text-primary">Nuevo Videojuego</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label>Portada del juego: <small>1440x2160</small></label>
                                    <input type="file" name="portada" class="form-control"  placeholder="Imagen de portada" required>
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" maxlength="100" name="titulo" class="form-control form-control-user"  placeholder="Titulo del videojuego" required>
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Describe el videojuego" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Precio:</label>
                                    <input type="number" min="0" max="9999.99" step=".01" name="precio" class="form-control form-control-user"  placeholder="Precio de venta" required>
                                </div>
                                <input type="hidden" name="actionid" value="addgame">
                                <button type="submit" class="btn btn-primary btn-user btn-block">
                                    Guardar
                                </button>                                        
                            </form>
                        </div>
                    </div>
                    
                </div>
            </div>                    
        </div>
    </div>
</div>
