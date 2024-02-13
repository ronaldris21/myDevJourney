<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_REQUEST['id_novedad']) || empty($_REQUEST['id_novedad'])){
        ?> 
        <script> window.location= "./index.php?p=listnovedades.php"; </script>
        <?php
    }

    $sql = "SELECT * FROM novedades WHERE id_novedad = ".$_REQUEST['id_novedad'];
    $result = $conn -> query($sql);
    if($result -> num_rows > 0){ 
        while ($row = $result -> fetch_assoc()){
            $titulo= $row['titulo_corto'];
            $id_novedad = $row['id_novedad'];
            $descripcion = $row['descripcion_banner'];
            $game = $row['id_game'];
            $image = $row['image_banner'];
        }
    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Novedad</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        
                        <div class="col-lg-5 ">

                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                <div class="form-group text-center">
                                    <img src=".<?= $image ?>" width="300px" alt="">
                                </div>
                                <div class="form-group">
                                    <label>Imagen para Banner: <small>Resulusión recomendada 800x500</small></label>
                                    <input type="file" name="portada" class="form-control "  placeholder="Imagen de banner">
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" name="titulo" class="form-control form-control-user"  placeholder="Titulo de la novedad" required value="<?= $titulo ?>">
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Resume la noticia" required><?= $descripcion ?></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Juego relacionado:</label>
                                    <select name="game" class="form-control"  placeholder="Enlace de la noticia" required>
                                        <?php 
                                            $sql = "SELECT * FROM videojuegos";
                                            $result = $conn -> query($sql);
                                            if($result -> num_rows > 0){ 
                                                while ($row = $result -> fetch_assoc()){
                                                    $id_game = $row['id_game'];
                                                    $nombre_game = $row['nombre_game'];
                                                    $select = ($game == $id_game) ? "selected" : "";
                                        ?>
                                            <option value="<?= $id_game ?>" <?= $select ?>><?= $nombre_game ?></option>
                                        <?php
                                                }
                                            }
                                        ?>
                                    </select>
                                </div>
                                <input type="hidden" name="actionid" value="modnovedad">
                                <input type="hidden" name="id_novedad" value="<?= $id_novedad ?>">
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
