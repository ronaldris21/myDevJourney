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
    if($result -> num_rows == 1){ 
        $row = $result -> fetch_assoc();
        $id_game = $row['id_game'];
        $game = $row['nombre_game'];
        $image = $row['image'];

    }
?>
<!-- DataTales Example -->
<div class="container">
    <div class="row">
        <div class="col-12">
            <div class="card shadow mb-4">
                <div class="card-header py-3">
                    <h6 class="m-0 font-weight-bold text-primary">Modificar Categorías de Videojuego</h6>
                </div>
                <div class="card-body jus">
                    <div class="row justify-content-center">
                        <div class="col-lg-4 ">
                            <img src=".<?= $image ?>" width="282px" height="397" alt="">
                        </div>
                        
                        <div class="col-lg-8 ">
                            <hgroup>
                                <h1 class="text-primary"><?= $game ?></h1>
                                <h3 class="text-dark">Seleciona categorias</h3>
                            </hgroup><br>
                            <div class="row justify-content-center">
                                
                                <?php
                                    $sql = "SELECT C.* FROM categorias C ";
                                    $result = $conn -> query($sql);
                                    if($result -> num_rows > 0){ 
                                        while ($row = $result -> fetch_assoc()){
                                            $categoria = $row['categoria'];
                                            $id_cat = $row['id_cat'];
                                            $id_game_gc = "";
                                            $id_gc = "";
                                            $sql = "SELECT GC.* FROM games_cat GC WHERE GC.id_categoria = $id_cat ";
                                            $result2 = $conn -> query($sql);
                                            if($result2 -> num_rows > 0){ 
                                                while ($row2 = $result2 -> fetch_assoc()){
                                                    $id_game_gc = $row2['id_game'];
                                                    $id_gc = $row2['id_gc'];
                                                    if ($id_game_gc == $id_game)
                                                        break;
                                                }
                                            }
                                            

                                            $checked = ($id_game == $id_game_gc) ? "checked" : "";
                                            $params = ($checked == "") ? "&id_cat=".$id_cat : "&id_gc=".$id_gc;


                                ?>
                                <div class="col-3 h4">
                                    <a href="actions.php?actionid=gamecat&id_game=<?= $id_game.$params ?>" class="text-reset"> 
                                        <input type="checkbox" <?= $checked ?>> <?= $categoria ?>
                                    </a>
                                </div>
                                    
                                <?php
                                    }
                                }
                                ?> 
                                <div class="col-12 row justify-content-center">
                                    <a href="?p=listgames.php" class="btn btn-primary">
                                        Regresar a la lista de videojuegos
                                    </a> 
                                </div>
                            </div>
                                
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