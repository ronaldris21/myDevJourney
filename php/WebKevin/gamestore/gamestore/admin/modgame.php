<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_REQUEST['id_game']) || empty($_REQUEST['id_game'])){
        ?> 
        <script> window.location= "./index.php?p=listgames.php"; </script>
        <?php
    }

    $sql = "SELECT * FROM videojuegos WHERE id_game = ".$_REQUEST['id_game'];
    $result = $conn -> query($sql);
    if($result -> num_rows > 0){ 
        while ($row = $result -> fetch_assoc()){
            $id_game = $row['id_game'];
            $descripcion = $row['descripcion'];
            $game = $row['nombre_game'];
            $precio = $row['precio'];
            $oferta = $row['oferta'];
            $prct_oferta = $row['prct_oferta'];
            $image = $row['image'];
            $si = $no = "";
            if($oferta == 1)
                $si = "checked";
            else
                $no = "checked";
        }
    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Videojuego</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <img src=".<?= $image ?>" width="282px" height="397" alt="">
                        <div class="col-lg-5 ">
                            
                            <form action="actions.php" method="post" class="user" enctype="multipart/form-data">
                                
                                <div class="form-group">
                                    <label>Portada del juego: <small>1440x2160</small></label>
                                    <input type="file" name="portada" class="form-control"  placeholder="Imagen de portada">
                                </div>
                                <div class="form-group">
                                    <label>Titulo:</label>
                                    <input type="text" maxlength="100" name="titulo" class="form-control form-control-user"  placeholder="Titulo del videojuego" required value="<?= $game ?>">
                                </div>
                                <div class="form-group">
                                    <label>Descripción:</label>
                                    <textarea name="descripcion" class="form-control form-control-user" placeholder="Describe el videojuego" required><?= $descripcion ?></textarea>
                                </div>
                                <div class="form-group">
                                    <label>Precio:</label>
                                    <input type="number" min="0" max="9999.99" step=".01" name="precio" class="form-control form-control-user"  placeholder="Precio de venta" required value="<?= $precio ?>">
                                </div>
                                <div class="form-group">
                                    <label>Oferta:</label>
                                    <input type="radio" name="oferta" id="ofrtsi" value="1" <?= $si ?> onClick="enableOferta()"> Sí &nbsp;&nbsp;
                                    <input type="radio" name="oferta" id="ofrtno" value="0" <?= $no ?> onClick="enableOferta()"> No
                                </div>
                                <div class="form-group" >
                                    <label>% de Oferta:</label>
                                    <input type="number" min="1" max="100" step="1" id="prctOfrt" name="prct" class="form-control form-control-user"  placeholder="Porcentaje de Oferta" required value="<?= $prct_oferta ?>">
                                </div>
                                <input type="hidden" name="actionid" value="modgame">
                                <input type="hidden" name="id_game" value="<?= $id_game ?>">
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
<script type="text/javascript">
    function enableOferta(){
        var radioSi = document.getElementById('ofrtsi');
        var radioNo = document.getElementById('ofrtno');

        var prct = document.getElementById('prctOfrt');

        if (radioSi.checked == true) {
            prct.readOnly = false;
        }else if (radioNo.checked == true) {
            prct.readOnly = true;
        }
    }
    enableOferta();
</script>