<?php
    @session_start();
    if(empty($principal) || !isset($_SESSION['user'])){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<section class="item-details">
    <section class="container">
        <section class="row">
            <section class="col-lg-12 col-12">
                <section class="product-details-info">
                    <section class="single-block">
                        <section class="info-body custom-responsive-margin">
                            <h4>LISTA DE DESEOS</h4>
                            <section class="container">
                                <section class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Videojuego</th>
                                                <th></th>
                                                <th>Precio</th>
                                                <th colspan=2></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    <?php
                                        $email_session = $_SESSION['email'];

                                        if($count_list > 0){
                                            $n = 0;
                                            $sql = "SELECT V.*, ROUND(V.precio - (V.precio * (V.prct_oferta / 100)),2) as 'descuento', D.id_deseo FROM videojuegos V INNER JOIN deseos D ON D.id_game = V.id_game WHERE D.email_user = '$email_session'";
                                            $result = $conn -> query($sql);
                                            if($result -> num_rows > 0){ 
                                                while ($row = $result -> fetch_assoc()){
                                                    $nombre_game = $row['nombre_game'];
                                                    $id_game = $row['id_game'];
                                                    $precio = $row['precio'];
                                                    $image = $row['image'];
                                                    $descripcion = substr($row['descripcion'],0,140)."... ";
                                                    $id_deseo = $row['id_deseo'];
                                                    $oferta = $row['oferta'];
                                                    $descuento = $row['descuento'];
                                                    $n++;

                                                    if($oferta == 1)
                                                        $precio = $descuento;                                            
                                    ?> 
                                                    <tr>
                                                        <td ><?= $n ?></td>
                                                        <td width="15%">
                                                            <img src="<?= $image ?>" >
                                                        </td>
                                                        <td class="fs-5" width="40%">
                                                            <?= $nombre_game ?>
                                                            <p class="fs-6 text-secondary">
                                                                <?= $descripcion ?>
                                                                <a class="" href="?p=detailsgame.php&id_game=<?= $id_game ?>"> ver más </a>
                                                            </p>
                                                        </td>
                                                        <td class="fs-6 text-secondary"><?= $precio ?> EUR</td>
                                                        <td>
                                                        <a href="validar.php?addtocar=<?=$id_game?>" class="button cart-button">
                                                            <button class="btn" style="width: 100%;">Añadir al Carrito</button>
                                                        </a>
                                                        </td>
                                                        <td><a href="validar.php?removelist=<?=$id_deseo?>"><i class="lni lni-trash-can fs-2 text-danger"></i></a></td>
                                                    </tr>
                                                    
                                    <?php
                                                }
                                            }
                                        }else{
                                    ?> 
                                            <tr><td class="fs-4 fw-bolder align-items-center" colspan="6">NO HAY JUEGOS AÑADIDOS A LA LISTA DE DESEOS</td></tr></th>         
                                    <?php
                                        }
                                    ?>
                                        </tbody>

                                    </table>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
    </section>
</section><br>