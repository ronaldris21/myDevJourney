<?php
    @session_start();
    if(empty($principal) || (!isset($_REQUEST['id_game']) || empty($_REQUEST['id_game']))){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Start Item Details -->
    <section class="item-details ">
        <section class="container">
                <section class="single-product">
                    
                    <?php
                    if (isset($_REQUEST['id_game'])) {
                        $id_game = $_REQUEST['id_game'];
                        $sql = "SELECT *, ROUND(precio - (precio * (prct_oferta / 100)),2) as 'descuento' FROM videojuegos WHERE id_game = $id_game";
                    
                        $result = $conn -> query($sql);
                        if($result -> num_rows > 0){ 
                            $row = $result -> fetch_assoc();
                            $nombre_game = $row['nombre_game'];
                            $id_game = $row['id_game'];
                            $precio = $row['precio'];
                            $oferta = $row['oferta'];
                            $prct_oferta =$row['prct_oferta'];
                            $image = $row['image'];
                            $descuento = $row['descuento'];
                            $descripcion = $row['descripcion'];
                        }   
                    }
                    
                    ?>
                    <section class=" row">
                        <section class="product-images col-lg-3 ">
                            <main id="gallery">
                                <figure class="main-img">
                                    <img src="<?= $image ?>" id="current">
                                </figure>
                            </main>
                        </section>
                        <section class="product-info col-lg-9 ">
                            <h2 class="title"><?= $nombre_game ?>
                                <?php

                                    $sql = "SELECT COUNT(GP.stars) as 'total', ROUND(AVG(GP.stars)) as 'stars' FROM game_pedidos GP WHERE GP.id_game = $id_game AND stars IS NOT NULL ";
                                    $result = $conn -> query($sql);
                                    if($result -> num_rows == 1 ){ 
                                            $row = $result -> fetch_assoc();
                                            $total = $row['total']; 
                                            $stars = $row['stars'];
                                ?>
                                            <ul class="review">
                                            <?php
                                                 for ($i = 1; $i <= 5; $i++){
                                                        $classlni = ($i <= $stars) ? "-filled" : "";
                                            ?>
                                            <li><i class="lni lni-star<?= $classlni ?> fs-5"></i></li>
                                            <?php        
                                                }
                                            ?>
                                            <li><span> <?= $stars ?> Estrellas (<?= $total ?> Reseñas)</span></li>
                                        </ul>
                                <?php
                                        }
                                ?>
                            </h2>
                            <p class="category"><i class="lni lni-tag"></i> Categorias:
                                <a href="javascript:void(0)">
                                    <?php 
                                        $num_categorias = 0;
                                        $subsql = "SELECT C.categoria FROM categorias C INNER JOIN games_cat GC ON GC.id_categoria = C.id_cat WHERE GC.id_game = $id_game";
                    
                                        $subresult = $conn -> query($subsql);
                                        if($subresult -> num_rows > 0){ 
                                            while ($row2 = $subresult -> fetch_assoc()){
                                                $categoria = $row2['categoria'];
                                                if ($num_categorias > 0)
                                                    echo " - ";
                                                echo $categoria;
                                                $num_categorias++;
                                            }
                                        }else{
                                            echo "Sin categoria asignada";
                                        }
                                    ?>
                                </a></p>

                            <h3 class="price">
                                <?php 
                                    if($oferta == 1){
                                ?>
                                    <?= $descuento ?> EUR
                                    <span><?= $precio ?> EUR</span>
                                <?php 
                                    }else{
                                        echo $precio." EUR";       
                                    }
                                ?>
                            </h3>
                            <p class="info-text"><?= $descripcion ?></p>
                            <section class="bottom-content">
                                <section class="row align-items-end">
                                    <section class="col-lg-4 col-md-4 col-12">
                                        <a href="validar.php?addtocar=<?=$id_game?>" class="button cart-button">
                                            <button class="btn" style="width: 100%;">Añadir al Carrito</button>
                                        </a>
                                    </section>
                                    <section class="col-lg-4 col-md-4 col-12">
                                        <?php
                                        if(isset($_SESSION['user'])){
                                            $subsql = "SELECT D.id_deseo FROM deseos D WHERE D.id_game = $id_game AND D.email_user = '$email_session'";
                    
                                            $subresult = $conn -> query($subsql);
                                            if($subresult -> num_rows > 0 ){ 
                                                while ($row2 = $subresult -> fetch_assoc()){
                                                    $id_lista = $row2['id_deseo'];
                                        ?>
                                            <a href="validar.php?removelist=<?=$id_lista?>" class="wish-button">
                                                <button class="btn" ><i class="lni lni-heart-filled"></i> Quitar de la lista</button>
                                            </a>
                                        <?php
                                                }
                                            }else{
                                                $subsql = "SELECT * FROM carritos C WHERE C.id_game = $id_game AND C.email_user = '$email_session'";
                                                $subresult = $conn -> query($subsql);
                                                if($subresult -> num_rows > 0 ){ 
                                                    $addhref = "javascript:void(0)";
                                                    $disabled = "disabled";
                                                }else{
                                                    $addhref = "validar.php?addtolist=$id_game";
                                                    $disabled = "";
                                                }

                                        ?>
                                            <a href="<?= $addhref ?>" class="wish-button">
                                                <button class="btn" <?= $disabled ?>><i class="lni lni-heart" ></i> Lista de Deseos</button>
                                            </a>
                                        <?php
                                            }
                                        }else{
                                            ?>
                                                            
                                            <a href="?e=Inicia sesión para añadir a la lista de deseos!" class="wish-button">
                                                <button class="btn" ><i class="lni lni-heart"></i> Lista de Deseos</button>
                                            </a>
                                                            
                                            <?php
                                        }
                                                
                                            ?>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            <?php

                @$sql = "SELECT GP.review, GP.stars, GP.id_game_pdd FROM game_pedidos GP INNER JOIN pedidos P ON P.id_pedido = GP.id_pedido WHERE GP.id_game = $id_game AND P.email_user = '$email_session' ";
                $result = $conn -> query($sql);
                if($result -> num_rows == 1 ){ 
                    $row = $result -> fetch_assoc();
                    $id_game_pdd = $row['id_game_pdd'];
                    $review = $row['review']; 
                    $stars = empty($row['stars']) ? 1 : $row['stars'];                              
                    
            ?>
                    <section class="product-details-info">
                        <section class="single-block">
                            <section class="row">
                                <section class="col-12">
                                    <section class="info-body custom-responsive-margin">
                                        <h4>TÚ HAS COMPRADO ESTE JUEGO, DEJANOS TU OPINIÓN</h4>
                                        <form action="validar.php" method="post">
                                            <div class="form-group ">
                                                <h4>Valoración</h4>
                                                <?php
                                                    for ($i = 1; $i <= 5; $i++){
                                                        $checked = ($stars == $i) ? "checked" : "";
                                                ?>
                                                    <input class="form-check-input " type="radio" name="stars" value="<?= $i ?>" <?= $checked ?>> <?= $i ?> &nbsp;&nbsp;
                                                <?php        
                                                    }
                                                ?>
                                            </div>
                                            <br><br>
                                            <div class="form-group">
                                                <h4>Reseña</h4>
                                                <textarea name="rvw" class="fadeIn" required="required" /><?= $review ?></textarea>
                                            </div>
                                            <div class="form-group">
                                                <input type="hidden" name="id_game" value="<?= $_GET['id_game'] ?>">
                                                <input type="hidden" name="id_game_pdd" value="<?= $id_game_pdd ?>">
                                                <input type="submit" name="editreview" class="fadeIn" value="Publicar reseña">
                                            </div>
                                        </form>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>

            <?php 
                }
            ?>
            <section class="product-details-info">
                <section class="single-block">
                    <h3>
                        RESEÑAS Y VALORACIONES
                    </h3>
                    <section class="row">
                        <?php
                            $sql = "SELECT GP.*, U.nombre, U.apellidos FROM game_pedidos GP LEFT JOIN pedidos P ON P.id_pedido = GP.id_pedido LEFT JOIN usuarios U ON U.email = P.email_user  WHERE GP.id_game = $id_game AND review IS NOT NULL ";
                            $result = $conn -> query($sql);
                            if($result -> num_rows > 0 ){ 
                                while($row = $result -> fetch_assoc()){
                                    $id_game_pdd = $row['id_game_pdd'];
                                    $review = $row['review']; 
                                    $stars = empty($row['stars']) ? 1 : $row['stars'];
                                    $nombre_user = $row['nombre']." ".$row['apellidos'];
                                    if ($nombre_user == " ")
                                        $nombre_user = "Usuario desconocido";

                        ?>
                        <section class="col-lg-6 col-md-6 col-12">
                            <section class="info-body custom-responsive-margin">
                                <section class="single-product">
                                    <section class="product-info">
                                        <h4><i class="lni lni-user fs-3"></i>  <?= $nombre_user ?></h4>
                                        <ul class="review">
                                            <?php
                                                 for ($i = 1; $i <= 5; $i++){
                                                        $classlni = ($i <= $stars) ? "-filled" : "";
                                            ?>
                                            <li><i class="lni lni-star<?= $classlni ?> fs-5"></i></li>
                                            <?php        
                                                }
                                            ?>
                                            <li><span> <?= $stars ?> Estrellas</span></li>
                                        </ul>
                                        <p class="fs-6"><?= $review ?></hp>
                                    </section>
                                </section>
                            </section>
                        </section>
                        <?php                                    
                                } 
                            }else
                                echo "<h5 class='text-center text-secondary'>NO HAY RESEÑAS SOBRE ESTE JUEGO </h5>"
                        ?>
                    </section>
                </section>
            </section>
            <br><br>
        </section>
    </section>
    <!-- End Item Details -->