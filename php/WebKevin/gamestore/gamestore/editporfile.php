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
            <section class="col-lg-7 col-md-12 col-12">
                <section class="product-details-info">
                    <section class="single-block">
                        <section class="info-body custom-responsive-margin">
                            
                            <?php
                                $email = $_SESSION['email'];
                                $password = $_SESSION['password'];
                                $nombre = $_SESSION['nombre'];
                                $apellidos = $_SESSION['apellidos'];
                                    
                            ?>

                                <button class="btn btn-danger delbutton" onclick="eliminar('<?= $email?>')"><i class="lni lni-trash-can"></i> Eliminar cuenta </button>

                            <h4>Editar Perfil</h4>
                            <form action="validar.php" method="post">
                                <div class="form-group">
                                    <label>Nombre:</label><br/>
                                    <input type="text" id="nombre" name="nombre" maxlength="20" class="fadeIn" placeholder="Nombre" required="required" value="<?= $nombre ?>" />
                                </div>
                                <div class="form-group">
                                    <label>Apellidos:</label><br/>
                                    <input type="text" id="apellidos" name="apellidos" maxlength="35" class="fadeIn" placeholder="Apellidos" required="required" value="<?= $apellidos ?>" />
                                </div>
                                <div class="form-group">
                                    <label>Correo Electrónico:</label><br/>
                                    <input type="email" id="login" class="fadeIn" name="email" maxlength="50" placeholder="Correo Electrónico" required="required" value="<?= $email ?>" />
                                </div>
                                <div class="form-group">
                                    <label>Contraseña:</label><br/>
                                    <input type="password" id="password" class="fadeIn" name="password" maxlength="30" placeholder="Contraseña" required="required" value="<?= $password ?>" />
                                </div>
                                <input type="submit" name="editdatos" class="fadeIn" value="Guardar cambios">
                            </form>
                        </section>
                    </section>
                </section>
                <section class="product-details-info">
                    <section class="single-block">
                        <section class="info-body custom-responsive-margin">
                            <h4>Pedidos Realizados</h4>
                            <section class="table-responsive">
                                    <table class="table align-middle">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Videojuegos</th>
                                                <th>Total</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                    <?php
                                        $email_session = $_SESSION['email'];
                                        $sql = "SELECT * FROM pedidos P WHERE email_user = '$email_session'";
                                        $result = $conn -> query($sql);
                                        if($result -> num_rows > 0){ 
                                            $n = 0;
                                            while ($row = $result -> fetch_assoc()){
                                               $id_pedido = $row['id_pedido'];
                                               $total = $row['total'];  
                                               $n++;                                          
                                    ?> 
                                                    <tr >
                                                        <td><?= $n ?></td>
                                                        <td>
                                    <?php
                                        $sql = "SELECT * FROM videojuegos V INNER JOIN game_pedidos GP ON GP.id_game = V.id_game WHERE GP.id_pedido = $id_pedido";
                                        $result2 = $conn -> query($sql);
                                        if($result2 -> num_rows > 0){ 
                                            while ($game = $result2 -> fetch_assoc()){
                                                $image = $game['image'];
                                                $nombre_game = $game['nombre_game'];
                                                ?>
                                                    
                                                        <img src="<?= $image ?>" width="60em">
                
                                                        &nbsp;<?= $nombre_game ?>

                                                        <br><br>
                                                <?php
                                            }
                                        }
                                    ?>

                                                        </td>
                                                        <td class="fs-4 align-middle"><?= $total ?> EUR</td>
                                                        <td class="align-middle"> <a class="btn btn-primary" href="?p=detailspedido.php&id_pedido=<?= $id_pedido ?>">Ver detalles</a></td>
                                                    </tr>
                                                    
                                    <?php
                                                }
                                            }else{
                                    ?>
                                                    <tr>
                                                        <td colspan="4">
                                                            NO HAS REALIZADO NINGUN PEDIDO!
                                                        </td>
                                                    </tr>
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
            <section class="col-lg-5 col-12">
                <section class="col-12">
                    <section class="product-details-info">
                        <section class="single-block">
                            <section class="info-body custom-responsive-margin">
                                <h4>Tarjetas</h4>
                                <form action="validar.php" method="post" class="row">
                                    <div class="col-12">
                                        <label>Num. Tarjeta:</label><br/>
                                        <input type="text" name="numero" maxlength="16" pattern="[0-9]{16}" class="fadeIn" placeholder="Num. Tarjeta" required="required" />
                                    </div>
                                    <div class="col-12">
                                        <label>Titular:</label><br/>
                                        <input type="text"  name="titular" maxlength="80" class="fadeIn" placeholder="Titular" required="required"  />
                                    </div>
                                    <div class="col-6">
                                        <label>Fecha de Expiración:</label><br/>
                                        <input type="text"  class="fadeIn" name="vencimiento" maxlength="5" pattern="[0-9]{2}/[0-9]{2}" placeholder="Expiración" required="required" />
                                    </div>
                                    <div class="col-6">
                                        <label>Código de Seguridad:</label><br/>
                                        <input type="password" class="fadeIn" name="code" maxlength="3" pattern="[0-9]{3}" placeholder="Código" required="required"  />
                                    </div>
                                    <div class="col-12 mx-auto">
                                        <input type="submit" name="addcard" class="fadeIn" value="Añadir Tarjeta">
                                    </div>
                                </form>
                                <section class="table-responsive">
                                    <table class="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Titular</th>
                                                <th>Núm. Tarjeta</th>
                                                <th>Fecha Expiración</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
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
                                                        $titular = $row['titular'];
                                                ?>
                                                    <tr>
                                                        <td> <?= $titular ?> </td>
                                                        <td> <?= $numero ?> </td>
                                                        <td> <?= $vencimiento ?> </td>
                                                        <td> <a class="btn btn-danger" href="validar.php?removecard=<?= $id_tarjeta ?>"> X </a></td>
                                                    </tr>
                                                <?php        
                                                    }
                                                } else {
                                                ?>
                                                    <tr>
                                                        <td colspan="4"> No hay tarjetas registradas. </td>
                                                    </tr>
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
                <section class="col-12">
                    <section class="product-details-info">
                        <section class="single-block">
                            <section class="info-body custom-responsive-margin">
                                <h4>Direcciones de facturación</h4>
                                <form action="validar.php" method="post" class="row">
                                    <div class="col-12">
                                        <label>Calle:</label><br/>
                                        <textarea name="calle" maxlength="300" class="fadeIn" placeholder="Calle" required="required" /></textarea>
                                    </div>
                                    <div class="col-3">
                                        <label>Nº:</label><br/>
                                        <input type="text"  name="num_calle" maxlength="4" class="fadeIn" placeholder="No" pattern="[0-9]{1,4}" required="required"  />
                                    </div>
                                    <div class="col-3">
                                        <label>Piso:</label><br/>
                                        <input type="text"  name="piso" maxlength="2" class="fadeIn" placeholder="Piso" pattern="[0-9]{1,2}" required="required"  />
                                    </div>
                                    <div class="col-3">
                                        <label>Puerta:</label><br/>
                                        <input type="text" class="fadeIn" name="puerta" maxlength="5"  placeholder="Prt" required="required"  />
                                    </div>
                                    <div class="col-3">
                                        <label>Cód. Postal:</label><br/>
                                        <input type="text" class="fadeIn" name="cpost" maxlength="5" pattern="[0-9]{1,5}" placeholder="CP"/>
                                    </div>
                                    <div class="col-12">
                                        <label>Provincia:</label><br/>
                                        <select class="fadeIn" name="provincia" required="required">
                                            <option value="Álava/Araba" selected>Álava/Araba</option>
                                            <option value="Albacete">Albacete</option>
                                            <option value="Alicante">Alicante</option>
                                            <option value="Almería">Almería</option>
                                            <option value="Asturias">Asturias</option>
                                            <option value="Ávila">Ávila</option>
                                            <option value="Badajoz">Badajoz</option>
                                            <option value="Baleares">Baleares</option>
                                            <option value="Barcelona">Barcelona</option>
                                            <option value="Burgos">Burgos</option>
                                            <option value="Cáceres">Cáceres</option>
                                            <option value="Cádiz">Cádiz</option>
                                            <option value="Cantabria">Cantabria</option>
                                            <option value="Castellón">Castellón</option>
                                            <option value="Ceuta">Ceuta</option>
                                            <option value="Ciudad Real">Ciudad Real</option>
                                            <option value="Córdoba">Córdoba</option>
                                            <option value="Cuenca">Cuenca</option>
                                            <option value="Gerona/Girona">Gerona/Girona</option>
                                            <option value="Granada">Granada</option>
                                            <option value="Guadalajara">Guadalajara</option>
                                            <option value="Guipúzcoa/Gipuzkoa">Guipúzcoa/Gipuzkoa</option>
                                            <option value="Huelva">Huelva</option>
                                            <option value="Huesca">Huesca</option>
                                            <option value="Jaén">Jaén</option>
                                            <option value="La Coruña/A Coruña">La Coruña/A Coruña</option>
                                            <option value="La Rioja">La Rioja</option>
                                            <option value="Las Palmas">Las Palmas</option>
                                            <option value="León">León</option>
                                            <option value="Lérida/Lleida">Lérida/Lleida</option>
                                            <option value="Lugo">Lugo</option>
                                            <option value="Madrid">Madrid</option>
                                            <option value="Málaga">Málaga</option>
                                            <option value="Melilla">Melilla</option>
                                            <option value="Murcia">Murcia</option>
                                            <option value="Navarra">Navarra</option>
                                            <option value="Orense/Ourense">Orense/Ourense</option>
                                            <option value="Palencia">Palencia</option>
                                            <option value="Pontevedra">Pontevedra</option>
                                            <option value="Salamanca">Salamanca</option>
                                            <option value="Segovia">Segovia</option>
                                            <option value="Sevilla">Sevilla</option>
                                            <option value="Soria">Soria</option>
                                            <option value="Tarragona">Tarragona</option>
                                            <option value="Tenerife">Tenerife</option>
                                            <option value="Teruel">Teruel</option>
                                            <option value="Toledo">Toledo</option>
                                            <option value="Valencia">Valencia</option>
                                            <option value="Valladolid">Valladolid</option>
                                            <option value="Vizcaya/Bizkaia">Vizcaya/Bizkaia</option>
                                            <option value="Zamora">Zamora</option>
                                            <option value="Zaragoza">Zaragoza</option>
                                        </select>
                                    </div>
                                    <div class="col-12 mx-auto">
                                        <input type="submit" name="adddir" class="fadeIn" value="Añadir Direccion">
                                    </div>
                                </form>
                                <section class="table-responsive">
                                    <table class="table table-striped">
                                        <thead >
                                            <tr>
                                                <th>Direccion</th>
                                                <th>CP</th>
                                                <th>Provincia</th>
                                                <th>Eliminar</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <?php 
                                                $email_session = $_SESSION['email'];
                                                $sql = "SELECT * FROM direcciones WHERE email_user = '$email_session'";
                                                $result = $conn -> query($sql);
                                                $nr = $result -> num_rows;
                                                if( $nr > 0) { 
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
                                                        <td> <?= $direccion ?> </td>
                                                        <td> <?= $cpost ?> </td>
                                                        <td> <?= $provincia ?> </td>
                                                        <td> <a class="btn btn-danger" href="validar.php?removedir=<?= $id_direccion ?>"> X </a></td>
                                                    </tr>
                                                <?php        
                                                    }
                                                } else {
                                                ?>
                                                    <tr>
                                                        <td colspan="4"> No hay direcciones registradas. </td>
                                                    </tr>
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
</section>
