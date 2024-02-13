<?php
    if(empty($principal)){
       ?> 
      <script> window.location= "./index.php"; </script>
       <?php
    }
?>
<!-- Page Heading -->
<h1 class="h3 mb-2 text-gray-800">Lista de Administradores</h1>
<!-- DataTales Example -->
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Administradores</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                <thead class="text-center">
                    <tr>
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th><i class="fas fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tfoot>
                    <tr class="text-center">
                        <th>Nombre</th>
                        <th>Apellidos</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </tfoot>
                <tbody>
                    <?php 

                        $sql = "SELECT * FROM usuarios WHERE tipo = 1";
                        $result = $conn -> query($sql);
                        $cont = 0;
                        if($result -> num_rows > 0){ 
                            while ($row = $result -> fetch_assoc()){
                                $cont++;
                                $nombre = $row['nombre'];
                                $apellidos = $row['apellidos'];
                                $email = $row['email'];
                    ?>
                        <tr>
                            <td><?= $nombre ?></td>
                            <td><?= $apellidos ?></td>
                            <td><?= $email ?></td>
                            <td class="text-center">
                            <?php 
                               if($email != $_SESSION['emailA']){
                            ?> 
                                <a href="#" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal<?= $cont ?>"><i class="fas fa-trash-alt"></i>Eliminar</a>
                            <?php 
                                }
                            ?>
                            </td>
                        </tr>
                        <!-- DELETE MODAL-->
                        <div class="modal fade" id="deleteModal<?= $cont ?>" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
                            aria-hidden="true">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">¿Desea eliminar al cliente  <?= $nombre." ".$apellidos ?>?</h5>
                                        <button class="close" type="button" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">×</span>
                                        </button>
                                    </div>
                                    <div class="modal-body"> Este registro se va a eliminar permanentemente.</div>
                                    <div class="modal-footer">
                                        <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancelar</button>
                                        <a class="btn btn-danger" href="actions.php?actionid=deladmin&id_usr=<?= $email ?>">Eliminar</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    <?php 
                            }
                        }else{
                    ?>
                        <tr>
                            <td colspan="4">No hay Administradores</td>                        
                        </tr>
                        
                    <?php 
                        }
                    ?>
                </tbody>
            </table>
        </div>
    </div>
</div>
