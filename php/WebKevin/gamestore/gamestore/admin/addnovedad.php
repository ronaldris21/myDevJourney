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
                    <h6 class="m-0 font-weight-bold text-primary">Nueva Novedad</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-5 ">
                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                <div class="form-group">
                                    <label>Imagen para Banner: <small>Resulusión recomendada 800x500</small></label>
                                    <input type="file" name="portada" class="form-control"  placeholder="Imagen de banner" required>
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" name="titulo" class="form-control form-control-user"  placeholder="Titulo de la novedad" required>
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Resume la noticia" required></textarea>
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
                                        ?>
                                            <option value="<?= $id_game ?>"><?= $nombre_game ?></option>
                                        <?php
                                                }
                                            }
                                        ?>
                                    </select>
                                </div>
                                <input type="hidden" name="actionid" value="addnovedad">
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
