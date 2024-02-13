<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_REQUEST['id_notice']) || empty($_REQUEST['id_notice'])){
        ?> 
        <script> window.location= "./index.php?p=listnotices.php"; </script>
        <?php
    }

    $sql = "SELECT * FROM notices WHERE id_notice = ".$_REQUEST['id_notice'];
    $result = $conn -> query($sql);
    if($result -> num_rows > 0){ 
        while ($row = $result -> fetch_assoc()){
            $id_notice = $row['id_notice'];
            $titulo = $row['titulo_notice'];
            $resumen = $row['resumen_notice'];
            $enlace = $row['enlace_notice'];
            $portada = $row['portada_notice'];
        }
    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Noticia</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        
                        <div class="col-lg-5 ">

                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                <div class="form-group text-center">
                                    <img src=".<?= $portada ?>" width="300px" alt="">
                                </div>
                                <div class="form-group">
                                    <label>Portada de la noticia:</label>
                                    <input type="file" name="portada" class="form-control"  placeholder="Imagen de portada">
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" name="titulo" class="form-control form-control-user"  placeholder="Titulo de la noticia" required value="<?= $titulo ?>">
                                </div>
                                <div class="form-group">
                                    <label>Resumen:</label>
                                    <textarea name="resumen" class="form-control form-control-user" placeholder="Resume la noticia" required><?= $resumen ?></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Enlace de la noticia:</label>
                                    <input type="text" name="enlace" class="form-control form-control-user"  placeholder="Enlace de la noticia" required value="<?= $enlace ?>">
                                </div>
                                <input type="hidden" name="actionid" value="modnotice">
                                <input type="hidden" name="id_notice" value="<?= $id_notice ?>">
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
