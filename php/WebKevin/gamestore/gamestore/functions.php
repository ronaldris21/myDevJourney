<?php
	@session_start();
	include_once("conn.php");
	
	function insertUser($nombre, $apellidos, $email, $password, $tipo){
		$conn = db_connect();
		$sql = "INSERT INTO usuarios (nombre, apellidos, email, password, tipo) VALUES ('$nombre', '$apellidos', '$email', '$password', $tipo)";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=login.php");
	    }else
	    	header("location: index.php?p=register.php&e=Problemas al registrarte, intentalo de nuevo!");
	}
	function delAccount($email){
		$conn = db_connect();
		$sql = "DELETE FROM usuarios WHERE email = '$email'";
	    if($conn -> query($sql)){
	    	header("location: logout.php");
	    }else
	    	header("location: index.php?p=editPorfile.php&e=Problemas al registrarte, intentalo de nuevo!");
	}
	function editPorfile($nombre, $apellidos, $email, $password){
		$email_session = $_SESSION['email'];
		$conn = db_connect();
		$sql = "UPDATE usuarios SET nombre ='$nombre', apellidos = '$apellidos', email = '$email', password = '$password' WHERE email = '$email_session'";
	    if($conn -> query($sql)){
	    	$_SESSION['email'] = $email;
	        $_SESSION['nombre'] = $nombre;
	        $_SESSION['apellidos'] = $apellidos;
	        $_SESSION['password'] = $password;
	    	header("location: index.php?p=editporfile.php&s=Se han guardado los cambios!");
	    }else
	    	header("location: index.php?p=editporfile.php&e=Problemas al guardar los datos, intentalo de nuevo!");
	}

	function validarLogin($email, $password, $tipo){
		$conn = db_connect();
		$sql = "SELECT * FROM usuarios WHERE email = '$email' and password = '$password' and tipo=$tipo";
	    $result = $conn -> query($sql);
	    $nr = $result -> num_rows;

	    if( $nr == 1) { 
	        while ($row = $result -> fetch_assoc()){
	            if($tipo == 1)
	            	$_SESSION['admin'] = 'Administrador';
	            else
	            	$_SESSION['user'] = 'Usuario';
	            $_SESSION['email'] = $row['email'];
	            $_SESSION['nombre'] = $row['nombre'];
	            $_SESSION['apellidos'] = $row['apellidos'];
	            $_SESSION['password'] = $row['password'];
	        }
	            header("location: index.php");
		} else {
				header("location: index.php?p=login.php&e=Usuario no encontrado!");
		}
	}

	function addToCar($id_game, $email){
		$conn = db_connect();
		$sql = "SELECT * FROM carritos WHERE email_user = '$email' and id_game = $id_game";
	    $result = $conn -> query($sql);
	    $nr = $result -> num_rows;
	    if( $nr == 1) { 
	        $row = $result -> fetch_assoc();
	        $id_carrito = $row['id_carrito'];
	        $sql = "UPDATE carritos SET cantidad = cantidad + 1 WHERE id_carrito = $id_carrito";
	    }else
	    	$sql = "INSERT INTO carritos (email_user, id_game, cantidad) VALUES ('$email', $id_game, 1)";
		
	    if($conn -> query($sql)){
	    	$sql = "DELETE FROM deseos WHERE email_user = '$email' and id_game = $id_game";
	    	$conn -> query($sql);
	    	header("location: index.php?p=carrito.php");
	    }else
	    	header("location: index.php?e=Problemas al añadir al carrito, intentalo de nuevo!");
	}

	function addToList($id_game, $email){
		$conn = db_connect();
		$sql = "SELECT * FROM deseos WHERE email_user = '$email' and id_game = $id_game";
	    $result = $conn -> query($sql);
	    $nr = $result -> num_rows;
	    if( $nr == 1) { 
	        header("location: index.php?e=Producto ya ha sido añadido a la lista de deseos!");
	    }else
	    	$sql = "INSERT INTO deseos (email_user, id_game) VALUES ('$email', $id_game)";
		
	    if($conn -> query($sql)){
	    	header("location: index.php?p=deseos.php");
	    }else
	    	header("location: index.php?p=deseos.php&e=Problemas al añadir a la lista de deseos, intentalo de nuevo!");
	}

	function addCard($numero, $titular, $vencimiento, $code){
		$email_session = $_SESSION['email'];
		$conn = db_connect();
		$sql = "INSERT INTO tarjetas (numero, titular, vencimiento, code, email_user) VALUES ($numero, '$titular', '$vencimiento', $code, '$email_session')";
		
	    if($conn -> query($sql)){
	    	header("location: index.php?p=editporfile.php&s=Se ha añadido la nueva tarjeta!");
	    }else
	    	header("location: index.php?p=editporfile.php&e=Problemas al añadir tarjeta, intentalo de nuevo!");
	}

	function addDir($calle, $num_calle, $piso, $puerta, $cpost, $provincia){
		$email_session = $_SESSION['email'];
		$conn = db_connect();
		$sql = "INSERT INTO direcciones (calle, num_calle, piso, puerta, cpost, provincia, email_user) VALUES ('$calle', $num_calle, $piso, '$puerta', $cpost, '$provincia', '$email_session')";
		
	    if($conn -> query($sql)){
	    	header("location: index.php?p=editporfile.php&s=Se ha añadido la nueva dirección!");
	    }else
	    	header("location: index.php?p=editporfile.php&e=Problemas al añadir la dirección, intentalo de nuevo!");
	}
	function changeReview($stars, $rvw, $id_game_pdd, $id_game){
		$conn = db_connect();
		$sql = "UPDATE game_pedidos SET review = '$rvw', stars = $stars WHERE id_game_pdd = $id_game_pdd";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=detailsgame.php&id_game=$id_game&s=Se ha publicado tu reseña sobre este juego ");
	    }else
	   		header("location: index.php?p=detailsgame.php&id_game=$id_game&e=Problemas al publicar la reseña, intentalo de nuevo!$sql");
	}

	function removeCar($id_carrito){
		$conn = db_connect();
		$sql = "DELETE FROM carritos WHERE id_carrito = $id_carrito";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=carrito.php");
	    }else
	    	header("location: index.php?p=carrito.php&e=Problemas al remover del carrito, intentalo de nuevo!");
	}
	function removeCopy($id_carrito){
		$conn = db_connect();
		$sqlaux = "SELECT * FROM carritos WHERE id_carrito = '$id_carrito'";
	    $result = $conn -> query($sqlaux);
	    $nr = $result -> num_rows;
	    if( $nr == 1) { 
	        $row = $result -> fetch_assoc();
	        $cantidad= $row['cantidad'];
	        if($cantidad > 1){
	        	$sql = "UPDATE carritos SET cantidad = cantidad - 1 WHERE id_carrito = $id_carrito";
	        }else{
	        	removeCar($id_carrito);
	        }
	    }

	    if($conn -> query($sql) and !empty($sql)){
	    	header("location: index.php?p=carrito.php");
	    }else
	    	header("location: index.php?p=carrito.php&e=Problemas al remover del carrito, intentalo de nuevo!");
	}

	function removeList($id_deseo){
		$conn = db_connect();
		$sql = "DELETE FROM deseos WHERE id_deseo = $id_deseo";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=deseos.php");
	    }else
	    	header("location: index.php?p=deseos.php&e=Problemas al remover de la lista de deseos, intentalo de nuevo!");
	}

	function removeCard($id_tarjeta){
		$conn = db_connect();
		$sql = "DELETE FROM tarjetas WHERE id_tarjeta = $id_tarjeta";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=editporfile.php&s=Se ha eliminado la tarjeta!");
	    }else
	    	header("location: index.php?p=editporfile.php&e=Problemas al eliminar la tarjeta, intentalo de nuevo!");
	}

	function removeDir($id_direccion){
		$conn = db_connect();
		$sql = "DELETE FROM direcciones WHERE id_direccion = $id_direccion";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=editporfile.php&s=Se ha eliminado la dirección!");
	    }else
	    	header("location: index.php?p=editporfile.php&e=Problemas al eliminar la dirección, intentalo de nuevo!");
	}


	function addToPedido($total, $id_tarjeta, $id_direccion, $pago_externo){
		$email_session = $_SESSION['email'];
		$conn = db_connect();
		$sql = "INSERT INTO pedidos (total, id_tarjeta, id_direccion, pago_externo, email_user) VALUES ($total, $id_tarjeta, $id_direccion, $pago_externo, '$email_session')";
		
	    if($conn -> query($sql)){
	    	$sql = "SELECT id_pedido FROM pedidos WHERE email_user = '$email_session' ORDER BY id_pedido DESC LIMIT 1";
		    $result = $conn -> query($sql);
		    $nr = $result -> num_rows;
		    if( $nr == 1) { 
		    	$row = $result -> fetch_assoc();
		    	$id_pedido = $row['id_pedido'];
		    	return $id_pedido;
		    }
		}

		return 0;
	}
	function addGamesPedido($id_pedido, $id_game, $cantidad){
		$email_session = $_SESSION['email'];
		$conn = db_connect();
		$sql = "INSERT INTO game_pedidos (id_pedido, id_game, cantidad) VALUES ($id_pedido, $id_game, $cantidad)";
	    if($conn -> query($sql)){
	    	$sql = "DELETE FROM carritos WHERE id_game = $id_game AND email_user = '$email_session'";
	    	$conn -> query($sql);
	    }else
	    	header("location: index.php?p=checkout.php&e=Problemas al intertar realizar la compra, intanta de nuevo!");
	}
?>