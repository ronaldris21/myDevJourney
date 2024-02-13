                    <!-- Content Row -->
                    <div class="row">

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-6 col-md-6 mb-4">
                            <div class="card border-left-primary shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                Total de juegos
                                            </div>
                                            <?php
                                                $sql = "SELECT COUNT(id_game) as 'total' FROM videojuegos";
                                                $result = $conn -> query($sql);
                                                if($result -> num_rows > 0){ 
                                                    while ($row = $result -> fetch_assoc()){
                                                        $total = $row['total'];
                                                    }
                                                }
                                            ?>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"><?= $total ?></div>
                                        </div>
                                        <div class="col-auto rotate-15">
                                            <i class="fas fa-gamepad fa-3x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-6 col-md-6 mb-4">
                            <div class="card border-left-success shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                Total de juegos vendidos</div>
                                            <?php
                                                $sql = "SELECT SUM(cantidad) as 'total' FROM game_pedidos";
                                                $result = $conn -> query($sql);
                                                if($result -> num_rows > 0){ 
                                                    while ($row = $result -> fetch_assoc()){
                                                        $total = $row['total'];
                                                    }
                                                }
                                            ?>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"><?= $total ?></div>
                                        </div>
                                        <div class="col-auto rotate-15">
                                            <i class="fas fa-dollar-sign fa-3x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Earnings (Monthly) Card Example -->
                        <div class="col-xl-6 col-md-6 mb-4">
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-info text-uppercase mb-1">
                                                Juegos sin compras
                                            </div>
                                            <?php
                                                $sql = "SELECT COUNT(*) as 'total' FROM videojuegos V LEFT JOIN game_pedidos GP ON GP.id_game = V.id_game WHERE GP.id_game_pdd IS NULL";
                                                $result = $conn -> query($sql);
                                                if($result -> num_rows > 0){ 
                                                    while ($row = $result -> fetch_assoc()){
                                                        $total = $row['total'];
                                                    }
                                                }
                                            ?>
                                            <div class="row no-gutters align-items-center">
                                                <div class="col-auto">
                                                    <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800"><?= $total ?></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-auto rotate-15">
                                            <i class="fas fa-heart-broken fa-3x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Pending Requests Card Example -->
                        <div class="col-xl-6 col-md-6 mb-4">
                            <div class="card border-left-warning shadow h-100 py-2">
                                <div class="card-body">
                                    <div class="row no-gutters align-items-center">
                                        <div class="col mr-2">
                                            <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                Clientes registrados    
                                            </div>
                                            <?php
                                                $sql = "SELECT COUNT(*) as 'total' FROM usuarios WHERE tipo = 2 ";
                                                $result = $conn -> query($sql);
                                                if($result -> num_rows > 0){ 
                                                    while ($row = $result -> fetch_assoc()){
                                                        $total = $row['total'];
                                                    }
                                                }
                                            ?>
                                            <div class="h5 mb-0 font-weight-bold text-gray-800"><?= $total ?></div>
                                        </div>
                                        <div class="col-auto rotate-15">
                                            <i class="fas fa-users fa-3x text-gray-300"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
<!-- Pie Chart -->          <?php
                                    $sql = "SELECT V.nombre_game, (SELECT SUM(cantidad) FROM game_pedidos GP WHERE GP.id_game = V.id_game) ventas FROM videojuegos V ORDER BY ventas DESC LIMIT 3";
                                        $total = 0;
                                        $result = $conn -> query($sql);
                                        if($result -> num_rows == 3){ 
                                            while ($row = $result -> fetch_assoc()){
                                                $total += $row['ventas'];
                                                $ventas[] = $row['ventas'];
                                                $nombre_game[] = $row['nombre_game'];
                                            }
                                ?>
                        <div class="col-xl-12 col-lg-12">
                            <div class="card shadow mb-4">
                                <!-- Card Header - Dropdown -->
                                <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold text-primary">Top 3 Ventas</h6>
                                    
                                </div>

                                <!-- Card Body -->
                                <div class="card-body">
                                    <div class="pt-4 pb-2">
                                        <div class="col">
                                            <?php 
                                                    foreach ($ventas as $venta ) { 
                                                        $prctPB[] = round ( ($venta / $total) * 100 , 2);
                                                    }
                                            ?>
                                            <span class="mr-2">
                                                <i class="fas fa-circle text-primary"></i> <?= $nombre_game[0].": ".$ventas[0] ?>ventas (<?= $prctPB[0] ?>%)
                                            </span>
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-primary" role="progressbar" style="width: <?= $prctPB[0] ?>%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>                                                
                                            </div><br>
                                            <span class="mr-2">
                                                <i class="fas fa-circle text-success"></i> <?= $nombre_game[1].": ".$ventas[1] ?>ventas (<?= $prctPB[1] ?>%)
                                            </span>
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-success" role="progressbar" style="width: <?= $prctPB[1] ?>%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                            </div><br>
                                            <span class="mr-2">
                                                <i class="fas fa-circle text-info"></i> <?= $nombre_game[2].": ".$ventas[2] ?>ventas (<?= $prctPB[2] ?>%)
                                            </span>
                                            <div class="progress progress-sm mr-2">
                                                <div class="progress-bar bg-info" role="progressbar" style="width: <?= $prctPB[2] ?>%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>    
                                            </div>                                               
                                        </div>
                                        <div class="mt-4 text-center small">
                                            
                                            
                                            
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
<?php 
                                        }
?>