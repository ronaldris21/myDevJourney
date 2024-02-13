<?php
    @session_start();
    if(empty($principal) || !isset($_SESSION['user'])){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }else{
    	$email_session = $_SESSION['email'];
        $sql = "SELECT COUNT('$email_session') as 'cont' FROM carritos WHERE email_user = '$email_session'";
        $result = $conn -> query($sql);
        $row = $result -> fetch_assoc();
        $count_carrito = $row['cont'];

        if ($count_carrito == 0) {
        ?> 
      		<script> window.location= "./index.php?e=No hay productos en el carrito de compras, no se puede realizar la compra!"; </script>
       <?php
        }
    }

    
?>
<form action="validar.php" method="get">
    <section class="item-details">
        <section class="container">
            <section class="row">
                <section class="col-lg-7 col-md-12 col-12">
                    <section class="product-details-info">
                        <section class="single-block">
                            <section class="info-body custom-responsive-margin">
                            	<section class="table-responsive">
                                    <table class="table">
                                            <input type="hidden" name="num_games" value="<?= $count_carrito ?>">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Videojuego</th>
                                                    <th></th>
                                                    <th>Cantidad</th>
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
                                                            <td class="fs-5">
                                                                <?= $nombre_game ?>
                                                            </td>
                                                            <td class="fs-4"><?= $cantidad ?></td>
                                                            <td class="fs-6 text-secondary"><?= $precio ?> EUR</td>
                                                            <td class="fs-5"><?= $subtotal ?> EUR</td>
                                                            <td><a href="validar.php?removecar=<?=$id_carrito?>"><i class="lni lni-trash-can fs-2 text-danger"></i></a></td>
                                                            <input type="hidden" name="id_games<?=$n?>" value="<?=$id_game?>">
                                                            <input type="hidden" name="cantidad<?=$n?>" value="<?=$cantidad?>">
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
                                                <th colspan="4"></th>
                                                <th class="fs-4 text-secondary"> Total: </th>
                                                <th colspan="2" class="fs-4"><?= sprintf("%.2f",$total) ?> EUR</th>
                                            </tfoot>
                                            <input type="hidden" name="total" value="<?= $total ?>">
                                    </table>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
                <section class="col-lg-5 col-12">
                    <section class="col-12">
                        <section class="product-details-info">
                            <section class="single-block">
                                <section class="info-body custom-responsive-margin">
                                    <section>
                                    <h4>Metodos de pago</h4>
                                    <section class="table-responsive">
                                        <table class="table">
                                        	<tbody>
    	                                    	<tr>
    	                                    		<td> <input class="form-check-input" type="radio" name="tarjeta_pago" value="p" checked> </td>
                                                    <td> <i class="lni lni-paypal-original fs-4"></i> </td>
                                                   	<td colspan="2"> Paypal </td>
    	                                    	</tr>
    											<tr>
    	                                    		<td> <input class="form-check-input" type="radio" name="tarjeta_pago" value="g"> </td>
                                                    <td> <i class="lni lni-google-pay fs-3"></i> </td>
                                                   	<td colspan="2"> Google Pay </td>
    	                                    	</tr>
                                                <?php 
                                                    $email_session = $_SESSION['email'];
                                                    $sql = "SELECT * FROM tarjetas WHERE email_user = '$email_session'";
                                                    $result = $conn -> query($sql);
                                                    $nr = $result -> num_rows;
                                                    if( $nr > 0) { 
                                                        while ($row = $result -> fetch_assoc()){
                                                            $id_tarjeta = $row['id_tarjeta'];
                                                            $numero = substr ($row['numero'], 0, 2)."** **** ".substr ($row['numero'], 12, 4);
                                                            $vencimiento = $row['vencimiento'];
                                                    ?>
                                                        <tr>
                                                        	<td> <input class="form-check-input" type="radio" name="tarjeta_pago" value="<?= $id_tarjeta ?>"> </td>
                                                            <td> <i class="lni lni-visa fs-3"></i> </td>
                                                            <td> <?= $numero ?> </td>
                                                            <td> Fch. Exp.<?= $vencimiento ?> </td>
                                                        </tr>
                                                    <?php        
                                                        }
                                                    }
                                                    ?>
                                                        <tr>
                                                            <td colspan="4"> <a href="?p=editporfile.php"> Añadir nueva tarjeta </a> para realizar esta compra. </td>
                                                        </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </section>
                                </section>
                            </section>
                        </section>
                    </section>
                    <section class="col-12">
                        <section class="product-details-info">
                            <section class="single-block">
                                <section class="info-body custom-responsive-margin">
                                    <h4>Dirección de facturación</h4>
                                    <section class="table-responsive">
                                        <table class="table">
                                            <thead >
                                                <tr>
                                                    <th></th>
                                                    <th>Direccion</th>
                                                    <th>CP</th>
                                                    <th>Provincia</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <?php 
                                                    $email_session = $_SESSION['email'];
                                                    $sql = "SELECT * FROM direcciones WHERE email_user = '$email_session'";
                                                    $result = $conn -> query($sql);
                                                    $nr = $result -> num_rows;
                                                    if( $nr > 0) {
                                                        $aux = "checked"; 
                                                        while ($row = $result -> fetch_assoc()){
                                                            $id_direccion = $row['id_direccion'];
                                                            $calle = $row['calle'];
                                                            $num_calle = $row['num_calle'];
                                                            $piso = $row['piso'];
                                                            $puerta = $row['puerta'];
                                                            $cpost = $row['cpost'];
                                                            $provincia = $row['provincia'];
                                                            $direccion = "$calle, $num_calle, $piso - $puerta";
                                                    ?>
                                                        <tr>
                                                            <td> <input class="form-check-input" type="radio" name="dir_fac" value="<?= $id_direccion ?>" <?= $aux ?>> </td>
                                                            <td> <?= $direccion ?> </td>
                                                            <td> <?= $cpost ?> </td>
                                                            <td> <?= $provincia ?> </td>
                                                        </tr>
                                                    <?php    
                                                            $aux="";    
                                                        }
                                                    } 
                                                    ?>
                                                    <tr>
                                                        <td colspan="4"> <a href="?p=editporfile.php"> Añadir nueva dirección de facturación </a> para realizar esta compra. </td>
                                                    </tr>
                                            </tbody>
                                        </table>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>

                    <section class="col-12">
                        <input type="submit" name="compra" class="fadeIn col-12" value="Finalizar Compra">  
                    </section>
                </section>
            </section>
        </section>
        <br>
    </section>
</form>
