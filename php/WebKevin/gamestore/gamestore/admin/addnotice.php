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
                    <h6 class="m-0 font-weight-bold text-primary">Nueva Noticia</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label>Portada de la noticia:</label>
                                    <input type="file" name="portada" class="form-control"  placeholder="Imagen de portada" required>
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" name="titulo" class="form-control form-control-user"  placeholder="Titulo de la noticia" required>
                                </div>
                                <div class="form-group">
                                    <label>Resumen:</label>
                                    <textarea name="resumen" class="form-control form-control-user" placeholder="Resume la noticia" required></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Enlace de la noticia:</label>
                                    <input type="text" name="enlace" class="form-control form-control-user"  placeholder="Enlace de la noticia" required>
                                </div>
                                <input type="hidden" name="actionid" value="addnotice">
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
