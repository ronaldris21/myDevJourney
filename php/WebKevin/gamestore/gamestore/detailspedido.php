<?php
    @session_start();
    if(empty($principal) || (!isset($_REQUEST['id_pedido']) || empty($_REQUEST['id_pedido']))){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<section class="product-details-info">
                    <section class="single-block">
                        <section class="info-body custom-responsive-margin">
                            <h4>Detalles del pedido</h4>
                            Comprador: <span class="fs-5"> <?= $_SESSION['nombre']." ".$_SESSION['apellidos'] ?></span>
                            <br>
                            <section class="table-responsive">
                                    <table class="table align-middle align-center">
                                        <thead>
                                            <tr class="align-center">
                                                <th>#</th>
                                                <th>Videojuegos</th>
                                                <th>Descarga</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    <?php
                                        $email_session = $_SESSION['email'];
                                        $id_ped = $_REQUEST['id_pedido'];
                                        $sql = "SELECT P.*, COUNT(GP.id_pedido) as 'contador' FROM pedidos P INNER JOIN game_pedidos GP ON GP.id_pedido = P.id_pedido WHERE P.id_pedido = $id_ped";
                                        $result = $conn -> query($sql);
                                        if($result -> num_rows > 0){ 
                                            $n = 0;
                                            while ($row = $result -> fetch_assoc()){
                                                $pago_externo = $row['pago_externo'];
                                                $id_pedido = $row['id_pedido'];
                                                $id_tarjeta = $row['id_tarjeta'];
                                                $id_direccion = $row['id_direccion'];
                                                $total = $row['total']; 
                                                $contador = $row['contador'] + 1;                                          
                                    ?> 
                                                <tr><td colspan="3"></td><td rowspan="<?= $contador ?>"class="fs-4 align-middle align-center"><?= $total ?> EUR</td></tr>               
                                    <?php
                                                    $sql = "SELECT V.image, V.nombre_game, GP.cantidad FROM videojuegos V INNER JOIN game_pedidos GP ON GP.id_game = V.id_game WHERE GP.id_pedido = $id_pedido";
                                                    $result2 = $conn -> query($sql);
                                                    if($result2 -> num_rows > 0){ 
                                                        while ($game = $result2 -> fetch_assoc()){
                                                           $n++;
                                                            $image = $game['image'];
                                                            $nombre_game = $game['nombre_game'];
                                                            $cantidad = $game['cantidad'];
                                                            ?>
                                                                 <tr>
                                                                    <td><?= $n ?></td>
                                                                    <td class="align-left">
                                                                    <img src="<?= $image ?>" width="60em">
                            
                                                                    &nbsp;<?= $nombre_game ?> ( x <?= $cantidad ?> copia(s))
                                                                    </td>
                                                                    <td><a href="javascript:void(0)"><i class="lni lni-download fs-3"></i> &nbsp;Iniciar Descarga</a></td>
                                                                </tr>
                                                            <?php
                                                        }
                                                    }
                                                    ?>
                                                        <tr>
                                                            <th colspan="4">METODO DE PAGO</th>
                                                        </tr>

                                                    <?php
                                                    if(!empty($id_tarjeta)){
                                                        $sql = "SELECT T.* FROM pedidos P INNER JOIN tarjetas T ON T.id_tarjeta = P.id_tarjeta WHERE P.id_pedido = $id_pedido";
                                                        $result2 = $conn -> query($sql);
                                                        if($result2 -> num_rows > 0){ 
                                                            while ($detail = $result2 -> fetch_assoc()){
                                                                $numero = substr ($detail['numero'], 0, 2)."** **** ".substr ($detail['numero'], 12, 4);
                                                                $vencimiento = $detail['vencimiento'];
                                                                $titular = $detail['titular'];
                                                                ?>  
                                                                    
                                                                     <tr>
                                                                        <td>Pago con: <br><span class="text-primary">Tarjeta de crédito</span></td>
                                                                        <td>Titular: <br><span class="text-primary"><?= $titular ?></span></td>
                                                                        <td>Num. Tarjeta: <br><span class="text-primary"><?= $numero ?></span></td>
                                                                        <td>Fcha. Vencimiento:<br><span class="text-primary"> <?= $vencimiento ?></span></td>
                                                                    </tr>
                                                                <?php
                                                            }
                                                        }
                                                    }else {
                                                        if ($pago_externo == -1){
                                                            $pagotipo = "Paypal";
                                                            $classlni = "lni-paypal-original";
                                                        }else if ($pago_externo == -2){
                                                            $pagotipo = "Google Pay";
                                                            $classlni = "lni-google-pay";
                                                        }
                                                        ?>  
                                                                      
                                                            <tr>
                                                                <td colspan="4">Pagado através de: <span class="text-primary"> <i class="lni <?= $classlni?> fs-4"></i> <?= $pagotipo ?></span></td>
                                                            </tr>
                                                        <?php
                                                    }

                                                    $sql = "SELECT D.* FROM direcciones D INNER JOIN pedidos P ON P.id_direccion = D.id_direccion  WHERE P.id_pedido = $id_pedido";
                                                    $result2 = $conn -> query($sql);
                                                    if($result2 -> num_rows > 0){ 
                                                        while ($detail = $result2 -> fetch_assoc()){
                                                            $direccion = $detail['calle'].", ".$detail['num_calle'].", ".$detail['piso']." - ".$detail['puerta'];
                                                            $cpost = $detail['cpost'];
                                                            $provincia = $detail['provincia'];
                                                            ?>  
                                                                <tr>
                                                                    <th colspan="4">DIRECCION DE FACTURACION</th>
                                                                </tr>
                                                                 <tr>
                                                                    <td colspan="2">Dirección: <br><span class="text-primary"><?= $direccion?></td>
                                                                    <td>Código Postal: <br><span class="text-primary"><?= $cpost ?></td>
                                                                    <td>Provincia:<br><span class="text-primary"> <?= $provincia ?></td>
                                                                    
                                                                </tr>
                                                            <?php
                                                        }
                                                    }
                                                }
                                            }else{
                                                echo "<script> window.location= './index.php?p=editporfile.php'; </script>";
                                            }
                                        
                                    ?>
                                        </tbody>

                                    </table>
                                </section>
                        </section>
                    </section>
                </section>