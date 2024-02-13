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
                            <h4>CARRITO DE COMPRAS</h4>
                            <section class="container">
                                <section class="table-responsive">
                                    <table class="table">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Videojuego</th>
                                                <th></th>
                                                <th colspan="3">Cantidad</th>
                                                <th>Precio</th>
                                                <th>Subtotal</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    <?php
                                        $email_session = $_SESSION['email'];
                                        if($count_carrito > 0){
                                            $total = 0.00;
                                            $n = 0;
                                            $sql = "SELECT V.*, ROUND(V.precio - (V.precio * (V.prct_oferta / 100)),2) as 'descuento', C.cantidad, C.id_carrito FROM videojuegos V INNER JOIN carritos C ON C.id_game = V.id_game WHERE C.email_user = '$email_session'";
                                            $result = $conn -> query($sql);
                                            if($result -> num_rows > 0){ 
                                                while ($row = $result -> fetch_assoc()){
                                                   $id_game = $row['id_game'];
                                                    $nombre_game = $row['nombre_game'];
                                                    $precio = $row['precio'];
                                                    $oferta = $row['oferta'];
                                                    $image = $row['image'];
                                                    $descripcion = substr($row['descripcion'], 0, 140)."... ";
                                                    $descuento = $row['descuento'];
                                                    $cantidad = $row['cantidad'];
                                                    $id_carrito = $row['id_carrito'];
                                                    $n++;
                                                if($oferta == 1)
                                                        $precio = $descuento;
                                                    
                                                    $subtotal = sprintf("%.2f",$cantidad * $precio);
                                                    $total += $subtotal;
                                             
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
                                                        <td>
                                                            <a href="validar.php?removecopycar=<?=$id_carrito?>">
                                                                <i class="lni lni-circle-minus fs-3"></i>
                                                            </a>
                                                        </td>
                                                        <td class="fs-2"><?= $cantidad ?></td>
                                                        <td>
                                                            <a href="validar.php?addtocar=<?=$id_game?>">
                                                                <i class="lni lni-circle-plus fs-3"></i>
                                                            </a>
                                                        </td>
                                                        <td class="fs-6 text-secondary"><?= $precio ?> EUR</td>
                                                        <td class="fs-5"><?= $subtotal ?> EUR</td>
                                                        <td><a href="validar.php?removecar=<?=$id_carrito?>"><i class="lni lni-trash-can fs-2 text-danger"></i></a></td>
                                                    </tr>
                                                    
                                    <?php
                                                }
                                            }
                                        }else{
                                    ?> 
                                            <tr><td class="fs-4 fw-bolder align-items-center" colspan="9">NO HAY JUEGOS AÑADIDOS AL CARRITO DE LA COMPRA</td></tr></th>         
                                    <?php
                                        }
                                    ?>
                                        </tbody>
                                        <tfoot>
                                            <th colspan="6"></th>
                                            <th class="fs-4 text-secondary"> Total: </th>
                                            <th class="fs-4"><?= sprintf("%.2f",$total) ?> EUR</th>
                                            <th><a href="?p=checkout.php" class="btn btn-primary">Pagar</a></th>
                                        </tfoot>
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