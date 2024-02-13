<?php
    @session_start();
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }

?>
   <section class="col-12">
      <section class="section-title">
         <h2>NOTICIAS </h2>
      </section>
   </section>
   <section class="banner">           
               <?php
                  $sql = "SELECT * FROM notices ORDER BY id_notice DESC";
                  $result = $conn -> query($sql);
                  if($result -> num_rows > 0){ 
                     while ($row = $result -> fetch_assoc()){
                        $titulo_notice = $row['titulo_notice'];
                        $resumen_notice = $row['resumen_notice'];
                        $enlace_notice = $row['enlace_notice'];
                        $portada_notice = $row['portada_notice'];

               ?>
                  <div class="col-12 section">
                     <div class="single-banner" style="background-image:url('<?= $portada_notice ?>')">
                        <div class="content">
                            <h2><?= $titulo_notice ?></h2>
                            <p><?= $resumen_notice ?></p>
                            <div class="button">
                                <a href="<?= $enlace_notice ?>" class="btn" target="_blank">Ver Noticia</a>
                            </div>
                        </div>
                     </div>
                  </div>
               <?php
                     }
                  }

               ?>
    </section>