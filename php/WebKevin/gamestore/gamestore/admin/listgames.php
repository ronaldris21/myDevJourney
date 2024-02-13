<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Lista de Videojuegos</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Videojuegos</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead class="text-center">
                    <tr>
                        <th>ID </th>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categorias</th>
                        <th>Precio</th>
                        <th>Oferta</th>
                        <th ><i class="fas fa-edit"></i></th>
                        <th><i class="fas fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="text-center">
                        <th>ID </th>
                        <th>Portada</th>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Categorias</th>
                        <th>Precio</th>
                        <th>Oferta</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <?php 

                        $sql = "SELECT * FROM videojuegos";
                        $result = $conn -> query($sql);
                        if($result -> num_rows > 0){ 
                            while ($row = $result -> fetch_assoc()){
                                $id_game = $row['id_game'];
                                $nombre_game = $row['nombre_game'];
                                $precio = $row['precio'];
                                $descripcion = $row['descripcion'];
                                $oferta = ($row['oferta'] == 1) ? $row['prct_oferta']." %" : "Sin oferta";
                                $image = $row['image'];
                                $categorias = "";
                                $sql = "SELECT C.categoria FROM categorias C INNER JOIN games_cat GC ON C.id_cat = GC.id_categoria WHERE GC.id_game = $id_game";
                                $result2 = $conn -> query($sql);
                                $n = $result2 -> num_rows;
                                if($n > 0){ 
                                    while ($row2 = $result2 -> fetch_assoc()){
                                        $categorias .= $row2['categoria']; 
                                        if($n > 1)
                                            $categorias .= ", ";

                                        $n--;
                                    }
                                }else
                                    $categorias = "Sin categorias asignadas";
                    ?>
                        <tr>
                            <td><?= $id_game ?></td>
                            <td><img src=".<?= $image ?>" width="200px"></td>
                            <td><?= $nombre_game ?></td>
                            <td><?= $descripcion ?></td>
                            <td><?= $categorias ?></td>
                            <td><?= $precio ?> EUR</td>
                            <td><?= $oferta ?></td>
                            <td class="text-center"><a href="?p=modgame.php&id_game=<?= $id_game ?>" class="btn btn-primary"><i class="fas fa-edit"></i>Editar</a><br><br>
                                    <a href="?p=gamescat.php&id_game=<?= $id_game ?>" class="btn btn-info"><i class="fas fa-tasks"></i>Categorías</a></td>
                            <td class="text-center"><a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal<?= $id_game ?>"><i class="fas fa-trash-alt"></i>Eliminar</a></td>
                        </tr>

                        <!-- DELETE MODAL-->
                        <div class="modal fade" id="deleteModal<?= $id_game ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">¿Desea eliminar <?= $nombre_game ?>?</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"> Este registro se va a eliminar permanentemente.</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                                        <a class="btn btn-danger" href="actions.php?actionid=delgame&id_game=<?= $id_game ?>">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                            }
                        }else{
                    ?>
                        <tr>
                            <td colspan="9">No hay Videojuegos</td>                        
                        </tr>
                    <?php 
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
