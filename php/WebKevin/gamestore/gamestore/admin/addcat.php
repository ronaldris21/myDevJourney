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
                    <h6 class="m-0 font-weight-bold text-primary">Nueva Categoría</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user">
                                <div class="form-group">
                                    <label>Nombre de la categoria:</label>
                                    <input type="text" name="categoria" class="form-control form-control-user"  placeholder="Nombre de la categoria" required>
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Describe la categoria" required></textarea>
                                </div>
                                <input type="hidden" name="actionid" value="addcat">
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
