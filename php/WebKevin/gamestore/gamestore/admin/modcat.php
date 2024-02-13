<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_REQUEST['id_cat']) || empty($_REQUEST['id_cat'])){
        ?> 
        <script> window.location= "./index.php?p=listcat.php"; </script>
        <?php
    }

    $sql = "SELECT C.* FROM categorias C WHERE id_cat = ".$_REQUEST['id_cat'];
    $result = $conn -> query($sql);
    if($result -> num_rows > 0){ 
        while ($row = $result -> fetch_assoc()){
            $categoria = $row['categoria'];
            $id_cat = $row['id_cat'];
            $descripcion = $row['descripcion'];
        }
    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Categoría</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user">
                                <div class="form-group">
                                    <label>Nombre de la categoria:</label>
                                    <input type="text" name="categoria" class="form-control form-control-user"  placeholder="Nombre de la categoria" required value="<?= $categoria ?>">
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Describe la categoria" required><?= $descripcion ?></textarea>
                                </div>
                                <input type="hidden" name="actionid" value="modcat">
                                <input type="hidden" name="id_cat" value="<?= $id_cat ?>">
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
