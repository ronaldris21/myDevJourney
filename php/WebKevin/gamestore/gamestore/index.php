<?php  
    @session_start();
    include_once("conn.php");
    $conn = db_connect();
    $principal = true;
?>
<!DOCTYPE html>
<html class="no-js" lang="zxx">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title> Game Store </title>
    <meta name="description" content="Tienda onlines de Videojuegos" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="shortcut icon" type="image/x-icon" href="images/gamestore.ico" />

    <!-- ========================= CSS ========================= -->
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/bootstrap.min.css" />
    <link rel="stylesheet" href="css/LineIcons.3.0.css" />
    <link rel="stylesheet" href="css/tiny-slider.css" />
    <link rel="stylesheet" href="css/glightbox.min.css" />
    <link rel="stylesheet" href="css/main.css" />
    <link rel="stylesheet" href="css/login.css" />
    
    <!-- Importar js de Geolocalización -->
    <script type="text/javascript" src="./js/geo.js"></script>

</head>

<body>
    <!-- Start Header Area -->
    <header class="header navbar-area">
        <!-- Start Header Middle -->
        <section class="header-middle">
            <section class="container">
                <section class="row align-items-center">
                    <section class="col-lg-3 col-md-12 col-4">
                        <!-- Start Header Logo -->
                        <a class="navbar-brand" href="index.php">
                            <!--img src="images/gamestore_black.png" alt="GameStore" id="imgGS"-->
                            <canvas id="logoGS"></canvas>
                        </a>
                        <!-- End Header Logo -->
                    </section>
                    <section class="col-lg-5 col-md-8 d-xs-none">
                        <!-- Start Main Menu Search -->
                        <main class="main-menu-search">
                            <!-- navbar search start -->
                            <form action='index.php?p=home.php' class="navbar-search search-style-5">
                                <p class="search-input">
                                    <input type="text" placeholder="Buscar Videojuego" name="buscar">
                                </p>
                                <p class="search-btn">
                                    <button type="submit"><i class="lni lni-search-alt"></i></button>
                                </p>
                            </form>
                            <!-- navbar search Ends -->
                        </main>
                        <!-- End Main Menu Search -->
                    </section>
                    <section class="col-lg-4 col-md-4 col-8">
                        <section class="middle-right-area">
                            
                            <section class="navbar-cart">
                                <?php
                                    $classlni = "lni-cart";
                                    if (isset($_SESSION['user'])){
                                        $email_session = $_SESSION['email'];
                                        $sql = "SELECT COUNT('$email_session') as 'cont' FROM carritos WHERE email_user = '$email_session'";
                                        $result = $conn -> query($sql);
                                        $row = $result -> fetch_assoc();
                                        $count_carrito = $row['cont'];
                                        if($count_carrito > 0)
                                            $classlni = "lni-cart-full";

                                        $sql = "SELECT COUNT('$email_session') as 'cont' FROM deseos WHERE email_user = '$email_session'";
                                        $result = $conn -> query($sql);
                                        $row = $result -> fetch_assoc();
                                        $count_list = $row['cont'];
                                     }else{
                                        $count_list = 0;
                                        $count_carrito = 0;
                                     }

                                ?>
                                <!-- LISTA DE DESEOS-->
                                <div class="cart-items">
                                    <a href="?p=deseos.php" class="main-btn">
                                        <i class="lni lni-heart"></i>
                                        <span class="total-items"><?= $count_list ?></span>
                                    </a>
                                    <section class="shopping-item">
                                        <?php
                                            if (isset($_SESSION['user'])){
                                                $email_session = $_SESSION['email'];
                                                ?> 
                                                    <div class="dropdown-cart-header">
                                                        <span><?= $count_list ?> Videojuego(s)</span>
                                                        <a href="?p=deseos.php">Ver Lista de deseos</a>
                                                    </div>
                                                <?php
                                                if($count_list > 0){
                                                    $total = 0;
                                                    $sql = "SELECT V.*, D.id_deseo, ROUND(V.precio - (V.precio * (V.prct_oferta / 100)),2) as 'descuento' FROM videojuegos V INNER JOIN deseos D ON D.id_game = V.id_game WHERE D.email_user = '$email_session'";
                                                    $result = $conn -> query($sql);
                                                    if($result -> num_rows > 0){ 
                                                        while ($row = $result -> fetch_assoc()){
                                                            $nombre_game = $row['nombre_game'];
                                                            $id_game = $row['id_game'];
                                                            $precio = $row['precio'];
                                                            $image = $row['image'];
                                                            $id_deseo = $row['id_deseo'];
                                                            $oferta = $row['oferta'];
                                                            $descuento = $row['descuento'];

                                                            if($oferta == 1)
                                                                $precio = $descuento; 
                                                     
                                                ?> 
                                                    <ul class="shopping-list">
                                                        <li>
                                                            <a href="validar.php?removelist=<?=$id_deseo?>" class="remove" title="Remove this item"><i
                                                                    class="lni lni-close"></i></a>
                                                            <div class="cart-img-head">
                                                                <a class="cart-img" href="?p=detailsgame.php&id_game=<?= $id_game ?>"><img
                                                                        src="<?= $image ?>" alt="<?= $nombre_game ?>"></a>
                                                            </div>

                                                            <div class="content">
                                                                <h4><a href="?p=detailsgame.php&id_game=<?= $id_game ?>">
                                                                        <?= $nombre_game ?>
                                                                    </a></h4>
                                                                <?= $precio ?> EUR
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    
                                                <?php
                                                        }
                                                    }
                                                }else{
                                                    ?> 
                                                        <ul class="shopping-list">
                                                            <li>
                                                                <p> No tienes productos añadidos a tu lista de deseos! </p>
                                                            </li>
                                                        </ul>
                                                    <?php
                                                }
                                            }else{
                                                ?> 
                                                    <ul class="shopping-list">
                                                        <li>
                                                            <p> Inicia sesión para poder hacer uso de la lista de deseos! </p>
                                                        </li>
                                                    </ul>
                                                <?php
                                            }

                                        ?>
                                    </section>
                                </div>
                                &nbsp;
                                <!-- CARRRITO DE LA COMPRA -->
                                <div class="cart-items">
                                    <a href="?p=carrito.php" class="main-btn">
                                        <i class="lni <?= $classlni ?>"></i>
                                        <span class="total-items"><?= $count_carrito ?></span>
                                    </a>
                                    <!-- Shopping Item -->
                                    <section class="shopping-item">
                                        <?php
                                            if (isset($_SESSION['user'])){
                                                $email_session = $_SESSION['email'];
                                                ?> 
                                                    <div class="dropdown-cart-header">
                                                        <span><?= $count_carrito ?> Videojuego(s)</span>
                                                        <a href="?p=carrito.php">Ver carrito</a>
                                                    </div>
                                                <?php
                                                if($count_carrito > 0){
                                                    $total = 0;
                                                    $sql = "SELECT V.*, ROUND(V.precio - (V.precio * (V.prct_oferta / 100)),2) as 'descuento', C.cantidad, C.id_carrito FROM videojuegos V INNER JOIN carritos C ON C.id_game = V.id_game WHERE C.email_user = '$email_session'";
                                                    $result = $conn -> query($sql);
                                                    if($result -> num_rows > 0){ 
                                                        while ($row = $result -> fetch_assoc()){
                                                            $id_game = $row['id_game'];
                                                            $nombre_game = $row['nombre_game'];
                                                            $precio = $row['precio'];
                                                            $oferta = $row['oferta'];
                                                            $prct_oferta =$row['prct_oferta'];
                                                            $image = $row['image'];
                                                            $descuento = $row['descuento'];
                                                            $cantidad = $row['cantidad'];
                                                            $id_carrito = $row['id_carrito'];
                                                     
                                                ?> 
                                                    <ul class="shopping-list">
                                                        <li>
                                                            <a href="validar.php?removecar=<?=$id_carrito?>" class="remove" title="Remove this item"><i
                                                                    class="lni lni-close"></i></a>
                                                            <div class="cart-img-head">
                                                                <a class="cart-img" href="?p=detailsgame.php&id_game=<?= $id_game ?>"><img
                                                                        src="<?= $image ?>" alt="<?= $nombre_gamem ?>"></a>
                                                            </div>

                                                            <div class="content">
                                                                <h4><a href="?p=detailsgame.php&id_game=<?= $id_game ?>">
                                                                        <?= $nombre_game ?>
                                                                    </a></h4>
                                                                <p class="quantity"><?= $cantidad ?>x - <span class="amount">
                                                                <?php 
                                                                if ($oferta == 1){
                                                                    echo $descuento;
                                                                    $total += ($descuento * $cantidad);
                                                                } else{
                                                                    echo $precio;
                                                                    $total += ($precio * $cantidad) ;
                                                                }


                                                                ?> EUR</span></p>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                    
                                                <?php
                                                        }
                                                    }
                                                ?>
                                                    <section class="bottom">
                                                        <section class="total">
                                                            <span>Total</span>
                                                            <span class="total-amount"><?= $total ?> EUR</span>
                                                        </section>
                                                        <section class="button">
                                                            <a href="?p=checkout.php" class="btn animate">Pagar</a>
                                                        </section>
                                                    </section>
                                                <?php
                                                }else{
                                                    ?> 
                                                        <ul class="shopping-list">
                                                            <li>
                                                                <p> No tienes productos añadidos en tu carrito! </p>
                                                            </li>
                                                        </ul>
                                                    <?php
                                                }
                                            }else{
                                                ?> 
                                                    <ul class="shopping-list">
                                                        <li>
                                                            <p> Inicia sesión para poder hacer uso del carrito de compras! </p>
                                                        </li>
                                                    </ul>
                                                <?php
                                            }

                                        ?>
                                    </section>
                                    <!--/ End Shopping Item -->
                                </div>
                            </section>
                            <section class="nav-hotline">
                                <?php 
                                    if (isset($_SESSION['user'])){
                                        ?> 
                                            <span class="user">
                                                <i class="lni lni-user"></i>
                                                
                                            </span>
                                            <ul class="user-login">
                                                <li>
                                                    Hola, <?= $_SESSION['nombre'] ?>
                                                </li>
                                                <li>
                                                    <a href="?p=editporfile.php">Ver Perfil</a>
                                                </li>
                                                <li>
                                                    <a href="logout.php">Cerrar Sesión</a>
                                                </li>
                                            </ul>
                                        <?php
                                    } else {
                                        ?> 
                                        <span class="user">
                                                <i class="lni lni-user"></i>
                                            </span>
                                        <ul class="user-login">
                                            <li>
                                                <a href="?p=login.php">Iniciar Sesión</a>
                                            </li>
                                            <li>
                                                <a href="?p=register.php">Registrarse</a>
                                            </li>
                                        </ul>
                                        <?php
                                    }  
                                ?>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </section>
        <!-- End Header Middle -->
        <!-- Start Header Bottom -->
        <section class="container">
            <div class="row align-items-center">
                <div class="col-lg-8 col-md-6 col-12">
                    <div class="nav-inner">
                        <!-- Start Mega Category Menu -->
                        <nav class="mega-category-menu">
                            <span class="cat-button"><i class="lni lni-menu"></i>Categorías</span>
                            <ul class="sub-category">
                                <?php  
                                    $sql = "SELECT C.*, (SELECT COUNT(*) FROM games_cat WHERE id_categoria = C.id_cat) as 'total' FROM categorias C ";
                                    $result = $conn -> query($sql);
                                    if($result -> num_rows > 0)
                                    { 
                                        while ($row = $result -> fetch_assoc())
                                        {
                                            $categoria = $row['categoria'];
                                            $id_cat = $row['id_cat'];
                                            $total = $row['total'];
                                    /* 
                                    while ($cat = mysqli_fetch_object($rsc)) {*/
                                        ?>
                                            <li><a href="?p=home.php&idcat=<?= $id_cat ?>"> <?= $categoria ?> (<?= $total ?>) </i></a></li>
                                        <?php 
                                        }
                                    }else{
                                        ?> 
                                            <li><a href="javascript:void(0)"> No hay categorias disponibles </i></a></li>
                                        <?php
                                    }
                                ?>
                            </ul>
                        </nav>
                        <!-- End Mega Category Menu -->
                        <!-- Start Navbar -->
                        <nav class="navbar navbar-expand-lg">
                            <button class="navbar-toggler mobile-menu-btn" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                                <span class="toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse sub-menu-bar" id="navbarSupportedContent">
                                <ul id="nav" class="navbar-nav ms-auto">
                                    <li class="nav-item">
                                        <a href="index.php" class="active" aria-label="Toggle navigation">Inicio</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?p=notices.php" aria-label="Toggle navigation">Noticias sobre videojuegos</a>
                                    </li>
                                    <li class="nav-item">
                                        <a href="?p=aboutus.php" aria-label="Toggle navigation">Sobre nosotros</a>
                                    </li>
                                </ul>
                            </div> <!-- navbar collapse -->
                        </nav>
                        <!-- End Navbar -->
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 col-12">
                    <!-- Start Nav Social -->
                    <div class="nav-social">
                        <h5 class="title">Siguenos en:</h5>
                        <ul>
                            <li>
                                <a href="https://es-la.facebook.com/GameStoreBolivia" target="_blank"><i class="lni lni-facebook-filled"></i></a>
                            </li>
                            <li>
                                <a href="https://twitter.com/gameplaystores?lang=es" target="_blank"><i class="lni lni-twitter-original"></i></a>
                            </li>
                            <li>
                                <a href="https://www.instagram.com/gamestore_ar/?hl=es" target="_blank"><i class="lni lni-instagram"></i></a>
                            </li>
                        </ul>
                    </div>
                    <!-- End Nav Social -->
                </div>
            </div>
        </section>
        <!-- End Header Bottom -->
    </header>
    <!-- End Header Area -->

    <!-- Container section-->
    <section class="container">
        <br />
        <?php 
            if(isset($_GET['e'])){
                $error = $_GET['e'];
                ?>
                <article class="alert alert-danger" role="alert">
                    <?= $error ?>
                </article>
                <?php 
            }
            if(isset($_GET['s'])){
                $msg = $_GET['s'];
                ?>
                <article class="alert alert-success" role="alert">
                    <?= $msg ?>
                </article>
                <?php 
            }
            if(isset($_GET['p'])){
                $page = $_GET['p'];
                include_once($page);
            } else
                include_once("home.php");

            
        ?>
    </section>

    <!-- Start Footer Area -->
    <footer class="footer">
        <!-- Start Footer Top -->
        <section class="footer-top">
            <section class="container">
                <section class="inner-content">
                    <section class="row">
                        <article class="col-lg-3 col-md-4 col-12">
                            <section class="footer-logo">
                                <a href="index.php">
                                    <canvas id="logoFooter"></canvas>
                                </a>
                            </section>
                        </article>
                        <article class="col-lg-9 col-md-8 col-12">
                            <section class="footer-newsletter">
                                <h4 class="title">
                                    Suscribete a nuestro Newsletter
                                    <span>Recibe Información sobre nuevos juegos y ofertas.</span>
                                </h4>
                                <section class="newsletter-form-head">
                                    <form action="#" method="get" target="_blank" class="newsletter-form">
                                        <input name="EMAIL" placeholder="Correo electrónico..." type="email">
                                        <div class="button">
                                            <button class="btn">Suscribirse<span class="dir-part"></span></button>
                                        </div>
                                    </form>
                                </section>
                            </section>
                        </article>
                    </section>
                </section>
            </section>
        </section>
        <!-- End Footer Top -->
        <!-- Start Footer Middle -->
        <section class="footer-middle">
            <section class="container">
                <section class="bottom-inner">
                    <section class="row">
                        <article class="col-lg-4 col-md-6 col-12">
                            <!-- Single Widget -->
                            <section class="single-footer f-contact">
                                <h3>Servicio al cliente </h3>
                                <p class="phone">Telefono: +34 934 33 16 72</p>
                                <p class="mail">
                                    <a href="mailto:support@shopgrids.com">support@gamestore.es</a>
                                </p>
                                <br>
                                <p><button class="btn btn-primary" onclick="geoFindMe()">Mostrar mi geolocalización</button></p>
                                <br>
                                <div id="out"></div>
                            </section>
                            <!-- End Single Widget -->
                        </article>
                        <article class="col-lg-4 col-md-6 col-12">
                            <!-- Single Widget -->
                            <section class="single-footer our-app">
                                <h3>Nuestra App móvil</h3>
                                <ul class="app-btn">
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i class="lni lni-apple"></i>
                                            <span class="small-title">Descargar en</span>
                                            <span class="big-title">App Store</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0)">
                                            <i class="lni lni-play-store"></i>
                                            <span class="small-title">Descargar en</span>
                                            <span class="big-title">Google Play</span>
                                        </a>
                                    </li>
                                </ul>
                            </section>
                            <!-- End Single Widget -->
                        </article>
                        <article class="col-lg-4 col-md-6 col-12">
                            <!-- Single Widget -->
                            <section class="single-footer f-link">
                                <h3>Información</h3>
                                <ul>
                                    <li><a href="?p=aboutus.php">Sobre nosotros</a></li>
                                    <li><a href="?p=aboutus.php">Contactanos</a></li>
                                    <li><a href="javascript:void(0)">FAQs - Preguntas frequentes</a></li>
                                </ul>
                            </section>
                            <!-- End Single Widget -->
                        </article>
                    </section>
                </section>
            </section>
        </section>
        <!-- End Footer Middle -->
        <!-- Start Footer Bottom -->
        <section class="footer-bottom">
            <div class="container">
                <div class="inner-content">
                    <div class="row align-items-center">
                        <div class="col-lg-4 col-12">
                            <div class="payment-gateway">
                                <span>Aceptamos:</span>
                                <img src="images/credit-cards-footer.png" alt="#">
                            </div>
                        </div>
                        <div class="col-lg-4 col-12">
                            <div class="copyright">
                                <p>Desarrollado por<a href="https://graygrids.com/" rel="nofollow"
                                        target="_blank">Kevin Castillo y Miguel Angel Anton</a></p>
                            </div>
                        </div>
                        <div class="col-lg-4 col-12">
                            <ul class="socila">
                                <li>
                                    <span>Siguenos en:</span>
                                </li>
                                <li><a href="https://es-la.facebook.com/GameStoreBolivia"><i class="lni lni-facebook-filled"></i></a></li>
                                <li><a href="https://twitter.com/gameplaystores?lang=es"><i class="lni lni-twitter-original"></i></a></li>
                                <li><a href="https://www.instagram.com/gamestore_ar/?hl=es"><i class="lni lni-instagram"></i></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Footer Bottom -->
    </footer>
    <!--/ End Footer Area -->

    <!-- ========================= scroll-top ========================= -->
    <a href="#" class="scroll-top">
        <i class="lni lni-chevron-up"></i>
    </a>

    <!-- ========================= JS here ========================= -->
    <script src="js/bootstrap.min.js"></script>
    <script src="js/tiny-slider.js"></script>
    <script src="js/glightbox.min.js"></script>
    <script src="js/main.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript">
        //========= Hero Slider 
        tns({
            container: '.hero-slider',
            slideBy: 'page',
            autoplay: true,
            autoplayButtonOutput: false,
            mouseDrag: true,
            gutter: 0,
            items: 1,
            nav: false,
            controls: true,
            controlsText: ['<i class="lni lni-chevron-left"></i>', '<i class="lni lni-chevron-right"></i>'],
        });
        function eliminar(id)
          {
          var opcion = confirm("Tu cuenta será eliminada de forma permanente, ¿deseas continuar? ");
          if (opcion == true)
              window.location = "validar.php?deleteaccount=" + id;
        } 
    </script>
    <script type="text/javascript">

        inicializarCanvas("logoGS");
        inicializarCanvas("logoFooter");
        function inicializarCanvas(id){ 
            var canvas = document.getElementById(id);
            var X,Y; 
            var ctx = canvas.getContext("2d");
            var s = getComputedStyle(canvas);
            var w = s.width;
            var h = s.height;
            canvas.width=w.split("px")[0];
            canvas.height=h.split("px")[0];
            X=canvas.width/2;
            Y=canvas.height/2;
            let img = new Image();

            if(id == "logoFooter")
                img.src ="./images/gamestore_white.png";
            else
                img.src ="./images/gamestore_black.png";

            img.addEventListener('load', mostrar_imagen, false);
            function mostrar_imagen() 
            {

                ctx.drawImage(img,0,0,w.split("px")[0],h.split("px")[0]);   
            }
        }

    </script>
</body>

</html>