<?php
	include_once("functions.php");

	if (isset($_REQUEST['login'])) {
		if (isset($_REQUEST['email']) && isset($_REQUEST['password'])) {
			$email = $_REQUEST['email'];
			$pass = $_REQUEST['password'];

	       	validarLogin($email, $pass, 2);
		} 
	}else if (isset($_REQUEST['register'])) {
		if(isset($_REQUEST['email']) && isset($_REQUEST['password']) && isset($_REQUEST['nombre']) && isset($_REQUEST['apellidos'])){
			$email = $_REQUEST['email'];
			$pass = $_REQUEST['password'];
			$nombre = $_REQUEST['nombre'];
			$apellidos = $_REQUEST['apellidos']; 

			insertUser($nombre, $apellidos, $email, $pass, 2);
		}			
	}else if (isset($_REQUEST['addtocar'])) {
			$id_game = $_REQUEST['addtocar'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para añadir al carrito!");
			else
				addToCar($id_game, $_SESSION['email']);
					
	}else if (isset($_REQUEST['removecar'])) {
			$id_carrito = $_REQUEST['removecar'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para utilizar el carrito!");
			else
				removeCar($id_carrito);
					
	}else if (isset($_REQUEST['removecopycar'])) {
			$id_carrito = $_REQUEST['removecopycar'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para utilizar el carrito!");
			else
				removeCopy($id_carrito);
					
	}else if(isset($_REQUEST['compra'])){
		if(isset($_REQUEST['dir_fac'])){
			$num_games = $_REQUEST['num_games'];
			$total = $_REQUEST['total'];
			$tarjeta_pago = $_REQUEST['tarjeta_pago'];
			$id_direccion = $_REQUEST['dir_fac'];
			switch ($tarjeta_pago) {
				case 'p':
					$id_tarjeta = 'NULL';
					$pago_externo = '-1';
					break;
				case 'g':
					$id_tarjeta =  'NULL';
					$pago_externo =  '-2';
					break;
				default:
					$id_tarjeta =  $tarjeta_pago;
					$pago_externo = 'NULL';
					break;
			}
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para realizar una compra!");
			else{
				$id_pedido = addToPedido($total, $id_tarjeta, $id_direccion, $pago_externo);
				for($i = 1; $i <= $num_games; $i++){
					$id_game = $_REQUEST['id_games'.$i];
					$cantidad = $_REQUEST['cantidad'.$i];
					addGamesPedido($id_pedido, $id_game, $cantidad);
				}
				header("location: index.php?p=editporfile.php&s=Gracias por tu compra, disfruta tus nuevos videojuegos!");
			}

			
		}else
			header("location: index.php?p=checkout.php&e=Necesitas introducir una dirección de facturación!");
	}else if (isset($_REQUEST['editreview'])) {
		$id_game_pdd = $_REQUEST['id_game_pdd'];
		$id_game = $_REQUEST['id_game'];
		$stars = $_REQUEST['stars'];
		$rvw = $_REQUEST['rvw'];
		if(!isset($_SESSION['user']))
			header("location: index.php?p=login.php&e=Inicia sesion para añadir a la lista de deseos!");
		else
			changeReview($stars, $rvw, $id_game_pdd,$id_game);
					
	}else if (isset($_REQUEST['addtolist'])) {
			$id_game = $_REQUEST['addtolist'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para añadir a la lista de deseos!");
			else
				addToList($id_game, $_SESSION['email']);
					
	}else if (isset($_REQUEST['removelist'])) {
			$id_deseo = $_REQUEST['removelist'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion para utilizar la lista de deseos!");
			else
				removeList($id_deseo);
					
	}else if (isset($_REQUEST['editdatos'])) {
		if(isset($_REQUEST['email']) && isset($_REQUEST['password']) && isset($_REQUEST['nombre']) && isset($_REQUEST['apellidos'])){
			$email = $_REQUEST['email'];
			$pass = $_REQUEST['password'];
			$nombre = $_REQUEST['nombre'];
			$apellidos = $_REQUEST['apellidos']; 

			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion!");
			else
				editPorfile($nombre, $apellidos, $email, $pass);
		}			
			
					
	}else if (isset($_REQUEST['addcard'])) {
		$titular = $_REQUEST['titular'];
		$numero = $_REQUEST['numero'];
		$vencimiento = $_REQUEST['vencimiento'];
		$code = $_REQUEST['code'];
		if(!isset($_SESSION['user']))
			header("location: index.php?p=login.php&e=Inicia sesion para añadir tarjetas!");
		else
			addCard($numero, $titular, $vencimiento, $code);
					
	}else if (isset($_REQUEST['removecard'])) {
			$id_tarjeta = $_REQUEST['removecard'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion!");
			else
				removeCard($id_tarjeta);
					
	}else if (isset($_REQUEST['removedir'])) {
			$id_direccion = $_REQUEST['removedir'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion!");
			else
				removeDir($id_direccion);
					
	}else if (isset($_REQUEST['deleteaccount'])) {
			$email = $_REQUEST['deleteaccount'];
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion!");
			else
				delAccount($email);
					
	}else if (isset($_REQUEST['adddir'])) {
		if(isset($_REQUEST['calle']) && isset($_REQUEST['num_calle']) && isset($_REQUEST['piso']) && isset($_REQUEST['puerta']) && isset($_REQUEST['cpost']) && isset($_REQUEST['provincia'])){

			$calle = $_REQUEST['calle'];
			$num_calle = $_REQUEST['num_calle'];
			$piso = $_REQUEST['piso'];
			$puerta = $_REQUEST['puerta']; 
			$cpost = $_REQUEST['cpost']; 
			$provincia = $_REQUEST['provincia']; 
			if(!isset($_SESSION['user']))
				header("location: index.php?p=login.php&e=Inicia sesion!");
			else
				addDir($calle, $num_calle, $piso, $puerta, $cpost, $provincia);
		}			
			
					
	}else
		header("location: index.php?e=Error al enviar los datos!");
		
?>