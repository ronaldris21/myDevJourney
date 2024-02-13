<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Lista de Noticias</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Noticias</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead class="text-center">
                    <tr>
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Resumen</th>
                        <th>Enlace a la noticia</th>
                        <th ><i class="fas fa-edit"></i></th>
                        <th><i class="fas fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="text-center">
                        <th>Portada</th>
                        <th>Titulo</th>
                        <th>Resumen</th>
                        <th>Enlace a la noticia</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <?php 

                        $sql = "SELECT * FROM notices";
                        $result = $conn -> query($sql);
                        if($result -> num_rows > 0){ 
                            while ($row = $result -> fetch_assoc()){
                                $id_notice = $row['id_notice'];
                                $portada_notice = $row['portada_notice'];
                                $resumen_notice = $row['resumen_notice'];
                                $enlace_notice = $row['enlace_notice'];
                                $titulo_notice = $row['titulo_notice'];
                    ?>
                        <tr>
                            <td><img src=".<?= $portada_notice ?>" width="300px" alt="No hay imagen disponible"></td>
                            <td><?= $titulo_notice ?></td>
                            <td><?= $resumen_notice ?></td>
                            <td><a href="<?= $enlace_notice ?>" target="_blank"><?= $enlace_notice ?></a></td>
                            <td><a href="?p=modnotice.php&id_notice=<?= $id_notice ?>" class="btn btn-primary"><i class="fas fa-edit"></i>Editar</a></td>
                            <td><a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal<?= $id_notice ?>"><i class="fas fa-trash-alt"></i>Eliminar</a></td>
                        </tr>

                        <!-- DELETE MODAL-->
                        <div class="modal fade" id="deleteModal<?= $id_notice ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">¿Desea eliminar esta noticia?</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"> Este registro se va a eliminar permanentemente.</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                                        <a class="btn btn-danger" href="actions.php?actionid=delnotice&id_notice=<?= $id_notice ?>">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                            }
                        }else{
                    ?>
                        <tr>
                            <td colspan="6">No hay noticias</td>                        
                        </tr>
                    <?php 
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
