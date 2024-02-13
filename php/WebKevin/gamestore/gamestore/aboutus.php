<?php
    @session_start();
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
 <!-- Start Shipping Info -->
    <section class="shipping-info">
        <section class="container">
            <ul>
                <!-- Free Shipping -->
                <li>
                    <article class="media-icon">
                        <i class="lni lni-delivery"></i>
                    </article>
                    <article class="media-body">
                        <h5>Envíos gratis</h5>
                        <span>En pedidos mayores a 50 EUR</span>
                    </article>
                </li>
                <!-- Money Return -->
                <li>
                    <article class="media-icon">
                        <i class="lni lni-support"></i>
                    </article>
                    <article class="media-body">
                        <h5>Servicio técnico 24/7.</h5>
                        <span>Llámanos cuando lo necesites.</span>
                    </article>
                </li>
                <!-- Support 24/7 -->
                <li>
                    <article class="media-icon">
                        <i class="lni lni-credit-cards"></i>
                    </article>
                    <article class="media-body">
                        <h5>Paga rápido y online.</h5>
                        <span>Servicios de pago seguros.</span>
                    </article>
                </li>
                <!-- Safe Payment -->
                <li>
                    <article class="media-icon">
                        <i class="lni lni-money-protection"></i>
                    </article>
                    <article class="media-body">
                        <h5>Cuidamos tu bolsillo.</h5>
                        <span>Precios bajos y ofertas todos los días.</span>
                    </article>
                </li>
            </ul>
        </section>
        <section class="product-details-info">
                <section class="single-block">
                    <section class="row">
                        <section class="col-lg-6 col-md-6 col-12">
                            <section class="info-body custom-responsive-margin">
                                <section class="single-product">
                                    <section class="product-info">
                                        <h3><i class="lni lni-phone fs-3"></i>&nbsp;&nbsp;&nbsp;&nbsp;Contáctanos </h3>
                                        <p class="phone">Telefono: +34 934 33 16 72</p>
                                        <p class="mail">
                                            <a href="mailto:support@shopgrids.com">support@gamestore.es</a>
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                        <section class="col-lg-6 col-md-6 col-12">
                            <section class="info-body custom-responsive-margin">
                                <section class="single-product">
                                    <section class="product-info">
                                        <h3><i class="lni lni-restaurant fs-3"></i>&nbsp;&nbsp;&nbsp;&nbsp;Sobre nosotros</h3>
                                        <p class="fs-6">
                                            ¡Es una excelente pregunta! Somos un grupo de apasionados del sector de los videojuegos, con más de 20 años de experiencia que decidieron apostar por ofrecer el espíritu de una tienda especializada de barrio pero directamente en el calor de tu hogar.

                                            Esta experiencia nos avala y nos garantiza la posibilidad de ofrecer un servicio de calidad con descuentos importantes, un gran catálogo con productos en stock, que prácticamente ninguna otra tienda puede ofrecer, y la disponibilidad de los productos más buscados. ¡Todo esto con una gran rapidez y profesionalidad!
                                        </p>
                                    </section>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
            <br><br>
    </section>
    <!-- End Shipping Info -->