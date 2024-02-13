<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Lista de Categorias</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Categorías</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead class="text-center">
                    <tr>
                        <th>ID Categoria</th>
                        <th>Categoria</th>
                        <th>Descripción</th>
                        <th>Nº Videojuegos</th>
                        <th ><i class="fas fa-edit"></i></th>
                        <th><i class="fas fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr>
                        <th>ID Categoria</th>
                        <th>Categoria</th>
                        <th>Descripción</th>
                        <th>Nº Videojuegos</th>
                        <th></th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <?php 

                        $sql = "SELECT C.*, (SELECT COUNT(*) FROM games_cat WHERE id_categoria = C.id_cat) as 'total' FROM categorias C ";
                        $result = $conn -> query($sql);
                        if($result -> num_rows > 0){ 
                            while ($row = $result -> fetch_assoc()){
                                $categoria = $row['categoria'];
                                $id_cat = $row['id_cat'];
                                $descripcion = $row['descripcion'];
                                $total = $row['total'];
                    ?>
                        <!-- Fila en la tabla-->
                        <tr>
                            <td><?= $id_cat ?></td>
                            <td><?= $categoria ?></td>
                            <td><?= $descripcion ?></td>
                            <td><?= $total ?></td>
                            <td  class="text-center"><a href="?p=modcat.php&id_cat=<?= $id_cat ?>" class="btn btn-primary"><i class="fas fa-edit"></i>Editar</a></td>
                            <td class="text-center"><a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal<?= $id_cat ?>"><i class="fas fa-trash-alt"></i>Eliminar</a></td>
                        </tr>


                        <!-- DELETE MODAL-->
                        <div class="modal fade" id="deleteModal<?= $id_cat ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">¿Desea eliminar <?= $categoria ?>?</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"> Este registro se va a eliminar permanentemente.</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                                        <a class="btn btn-danger" href="actions.php?actionid=delcat&id_cat=<?= $id_cat ?>">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                            }
                        }else{
                    ?>
                        <tr>
                            <td colspan="6">No hay categorías</td>                        
                        </tr>
                    <?php 
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
 