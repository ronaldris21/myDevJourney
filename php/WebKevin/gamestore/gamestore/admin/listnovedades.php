<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Lista de Novedades</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Novedades</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead class="text-center">
                    <tr>
                        <th>Imagen</th>
                        <th>Titulo corto</th>
                        <th>Descripción</th>
                        <th>Videojuego</th>
                        <th><i class="fas fa-edit"></i></th>
                        <th><i class="fas fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="text-center">
                        <th>Imagen</th>
                        <th>Titulo corto</th>
                        <th>Descripción</th>
                        <th>Videojuego</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <?php 

                        $sql = "SELECT N.*, V.nombre_game FROM novedades N INNER JOIN videojuegos V ON V.id_game = N.id_game";
                        $result = $conn -> query($sql);
                        if($result -> num_rows > 0){ 
                            while ($row = $result -> fetch_assoc()){
                                $titulo= $row['titulo_corto'];
                                $id_novedad = $row['id_novedad'];
                                $descripcion = $row['descripcion_banner'];
                                $nombre_game = $row['nombre_game'];
                                $image = $row['image_banner'];
                    ?>
                        <tr>
                            <td><img src=".<?= $image ?>" alt="BannerImage desconocida" width="300px"></td>
                            <td><?= $titulo ?></td>
                            <td><?= $descripcion ?></td>
                            <td><?= $nombre_game ?></td>
                            <td class="text-center"><a href="?p=modnovedad.php&id_novedad=<?= $id_novedad ?>" class="btn btn-primary"><i class="fas fa-edit"></i>Editar</a></td>
                            <td class="text-center"><a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal<?= $id_novedad ?>"><i class="fas fa-trash-alt"></i>Eliminar</a></td>
                        </tr>

                        <!-- DELETE MODAL-->
                        <div class="modal fade" id="deleteModal<?= $id_novedad ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">¿Desea eliminar esta novedad sobre <?= $nombre_game ?>?</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"> Este registro se va a eliminar permanentemente.</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                                        <a class="btn btn-danger" href="actions.php?actionid=delnovedad&id_novedad=<?= $id_novedad ?>">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                            }
                        }else{
                    ?>
                        <tr>
                            <td colspan="6">No hay novedades</td>                        
                        </tr>
                    <?php 
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
