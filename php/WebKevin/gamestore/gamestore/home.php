<?php  

    @session_start();
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

    if(!isset($_REQUEST['idcat']) && !isset($_REQUEST['buscar'])){

?>

<!-- Start Hero Area -->
    <section class="hero-area">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-12 custom-padding-right ">
                    <div class="slider-head">
                        <!-- Start Hero Slider -->
                        <div class="hero-slider">
                            <?php 
                                $sql = "SELECT V.*, ROUND(precio - (precio * (prct_oferta / 100)),2) as 'descuento', N.* FROM videojuegos V INNER JOIN novedades N ON N.id_game = V.id_game";
                                $result = $conn -> query($sql);
                                if($result -> num_rows > 0){ 
                                    while ($row = $result -> fetch_assoc()){
                                        $nombre_game = $row['nombre_game'];
                                        $id_game = $row['id_game'];
                                        $precio = $row['precio'];
                                        $oferta = $row['oferta'];
                                        $image = $row['image_banner'];
                                        $descuento = $row['descuento'];
                                        $titulo_corto  = $row['titulo_corto'];
                                        $descripcion = $row['descripcion_banner'];
                                        if ($oferta == 1){
                                            $price = $descuento;
                                            $precio .= " EUR" ;
                                            $textextra = "Ahora por solo: ";
                                        }else{

                                            $price = $precio;
                                            $textextra = "Disponible por: ";
                                            $precio = "";
                                        }
                            ?>
                            <!-- Start Single Slider -->
                            <div class="single-slider"
                                style="background-image: url(<?= $image ?>);">
                                <div class="content">
                                    <h2><span><?= $titulo_corto ?></span>
                                        <?= $nombre_game ?>
                                    </h2>
                                    <p><?= $descripcion ?></p>

                                    <p class="fs-3 fw-bold"><span class="fs-5"><?= $textextra ?></span> 
                                        <?= $price ?> EUR <span class="fs-5 text-decoration-line-through"><?= $precio ?> </span> 
                                    </p>
                                    <div class="button">
                                        <a href="?p=detailsgame.php&id_game=<?= $id_game ?>" class="btn">Ver más</a>
                                    </div>
                                </div>
                            </div>
                            <?php
                                    }
                                }
                            ?>
                            <!-- End Single Slider -->
                        </div>
                        <!-- End Hero Slider -->
                    </div>
                </div>
                <div class="col-lg-4 col-12">
                    <div class="row">
                        <div class="col-lg-12 col-md-6 col-12 md-custom-padding">
                            <!-- Start Small Banner -->
                            <?php 
                                $sql = "SELECT * FROM `videojuegos` ORDER BY id_game DESC LIMIT 1";
                                $result = $conn -> query($sql);
                                if($result -> num_rows == 1){ 
                                    $row = $result -> fetch_assoc();
                                    $nombre_game = $row['nombre_game'];
                                    $id_game = $row['id_game'];
                                    $image = $row['image'];
                            ?>
                            <div class="hero-small-banner"
                                style="background-image: url('./images/banners/white_new_banner.jpg');">
                                <div class="content">
                                    <h2>
                                        <span>Enterate de todas las novedades </span>
                                        <?= $nombre_game ?>
                                    </h2>
                                    <h3><a href="?p=detailsgame.php&id_game=<?= $id_game ?>"> Miralo aquí!</a></h3>
                                    
                                </div>
                                <figure>
                                        <img src="<?= $image ?>" class="imgnovedad">
                                </figure>
                            </div>
                            <!-- End Small Banner -->
                        </div>

                        <?php   }   ?>

                        <div class="col-lg-12 col-md-6 col-12">
                            <!-- Start Small Banner -->
                            <div class="hero-small-banner style2">
                                <div class="content">
                                    <h2>Game Store!</h2>
                                    <p>Los mejores precios y las mejores ofertas todos los días.</p>
                                    <div class="button">
                                        <a class="btn" href="?p=aboutus.php">Más sobre GameStore</a>
                                    </div>
                                </div>
                            </div>
                            <!-- Start Small Banner -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- End Hero Area -->

<?php  

    }

?>
    <!-- Start Trending Product Area -->
    <section class="trending-product section" style="margin-top: 12px;">
        <section class="container">
            <article class="row">
                <div class="col-12">
                    <div class="section-title">
                        <h2>Videojuegos</h2>
                    </div>
                </div>
            </article>
            <article class="row">
                <?php
                    include_once("conn.php");
                    $catname = "";
                    if(isset($_REQUEST['idcat']) && !empty($_REQUEST['idcat'])){
                        $idcat = $_REQUEST['idcat'];
                        $sql = "SELECT *, ROUND(precio - (precio * (prct_oferta / 100)),2) as 'descuento' FROM videojuegos V INNER JOIN games_cat GC ON GC.id_game = V.id_game WHERE id_categoria = $idcat";
                    }else if(isset($_REQUEST['buscar']) && !empty($_REQUEST['buscar'])){
                        $juego = $_REQUEST['buscar'];
                        $sql = "SELECT *, ROUND(precio - (precio * (prct_oferta / 100)),2) as 'descuento' FROM videojuegos V WHERE UPPER(nombre_game) LIKE UPPER('%$juego%')";

                    }else
                        $sql = "SELECT *, ROUND(precio - (precio * (prct_oferta / 100)),2) as 'descuento' FROM videojuegos";
                    
                    $result = $conn -> query($sql);
                    if($result -> num_rows > 0){ 
                        while ($row = $result -> fetch_assoc()){
                            $nombre_game = $row['nombre_game'];
                            $id_game = $row['id_game'];
                            $precio = $row['precio'];
                            $oferta = $row['oferta'];
                            $prct_oferta =$row['prct_oferta'];
                            $image = $row['image'];
                            $descuento = $row['descuento'];
                            ?>

                            <article class="col-lg-3 col-md-6 col-6">
                                <!-- Start Single Product -->
                                <section class="single-product">
                                    
                                    <section class="product-image">
                                        <img src="<?= $image ?>" alt="Portada">
                                        <?php 
                                            if($oferta == 1){
                                        ?>
                                                <span class="sale-tag">-<?= $prct_oferta ?>%</span>
                                        <?php 
                                            }
                                        ?>
                                        <section class="button">
                                            <a href="validar.php?addtocar=<?= $id_game ?>" class="btn"><i class="lni lni-cart"></i> Anñadir al carrito </a>
                                        </section>
                                    </section>
                                    <div class="">
                                        <br>
                                        <?php
                                        if(isset($_SESSION['user'])){
                                                    $subsql = "SELECT D.id_deseo FROM deseos D WHERE D.id_game = $id_game AND D.email_user = '$email_session'";
                    
                                                    $subresult = $conn -> query($subsql);
                                                    if($subresult -> num_rows > 0 ){ 
                                                        while ($row2 = $subresult -> fetch_assoc()){
                                                            $id_lista = $row2['id_deseo'];
                                                            ?>
                                                                    <a href="validar.php?removelist=<?=$id_lista?>" class="main-btn fs-6">
                                                                        &nbsp;<i class="lni lni-heart-filled fs-5"> </i> Añadido a la lista de deseos!
                                                                    </a>
                                                            <?php
                                                        }
                                                    }else{
                                                        $subsql = "SELECT * FROM carritos C WHERE C.id_game = $id_game AND C.email_user = '$email_session'";
                                                        $subresult = $conn -> query($subsql);
                                                        if($subresult -> num_rows > 0 ){ 
                                                            $addhref = "javascript:void(0)";
                                                            $addclass = "text-decoration-line-through text-reset";
                                                        }else{
                                                            $addhref = "validar.php?addtolist=$id_game";
                                                            $addclass = "";
                                                        }
                                                        ?>
                                                                <a href="<?= $addhref ?>" class="main-btn fs-6 <?= $addclass ?>">
                                                                    &nbsp;<i class="lni lni-heart fs-5"> </i> Añadir a la lista de deseos!
                                                                </a>
                                                        <?php
                                                    }
                                                }else{
                                                    ?>
                                                            
                                                                <a href="?p=login.php&e=Inicia sesión para añadir a la lista de deseos" class="main-btn fs-6">
                                                                    &nbsp;<i class="lni lni-heart fs-6"> </i> Añadir a la lista de deseos!
                                                                </a>
                                                            
                                                        <?php
                                                }
                                                
                                            ?>
                                            
                                    </div>
                                    <section class="product-info">
                                        <span class="category">
                                            
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

                                        </span>
                                        <h4 class="title">
                                            <a href="?p=detailsgame.php&id_game=<?= $id_game ?>"><?= $nombre_game ?></a>
                                        </h4>
                                        <ul class="review">
                                        <?php

                                            $sql = "SELECT COUNT(GP.stars) as 'total', ROUND(AVG(GP.stars)) as 'stars' FROM game_pedidos GP WHERE GP.id_game = $id_game AND stars IS NOT NULL ";
                                            $resultstars = $conn -> query($sql);
                                            if($resultstars -> num_rows == 1 ){ 
                                                    $rw = $resultstars -> fetch_assoc();
                                                    $total = $rw['total']; 
                                                    $stars = $rw['stars'];
                                        ?>
                                                    
                                                    <?php
                                                         for ($i = 1; $i <= 5; $i++){
                                                                $classlni = ($i <= $stars) ? "-filled" : "";
                                                    ?>
                                                    <li><i class="lni lni-star<?= $classlni ?> fs-6"></i></li>
                                                    <?php        
                                                        }
                                                    ?>
                                                    <li><span> <?= $total ?> Reseñas</span></li>
                                                
                                        <?php
                                                }
                                        ?>
                                        </ul>
                                        <section class="price">
                                            <?php 
                                                if($oferta == 1){
                                            ?>
                                                    <span><?= $descuento ?> EUR</span>
                                                    <span class="discount-price"><?= $precio ?> EUR</span>
                                            <?php 
                                                }else{
                                            ?>
                                                    <span><?= $precio ?> EUR</span>
                                                    
                                            <?php        
                                                }
                                            ?>
                                            
                                        </section>
                                    </section>
                                </section>
                                <!-- End Single Product -->
                            </article>

                            <?php
                        }
                    }else{

                        ?>

                            <section class="col-lg-12 col-md-12 col-12">
                                <h2 class="text-center">
                                    NO SE ENCONTRARON RESULTADOS 
                                </h2>
                            </section>

                        <?php
                    }
                ?>
            </article>
        </section>
    </section>
    <!-- End Trending Product Area -->

   