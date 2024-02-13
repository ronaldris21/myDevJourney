<?php
	include_once("./functions.php");

	if(isset($_REQUEST['actionid'])){

		$actionid = $_REQUEST['actionid'];
		
		switch ($actionid){
			case 'login':
				$email = $_REQUEST['email'];
				$pass = $_REQUEST['password'];

		       	validarLogin($email, $pass, 1);
				break;
			case 'gamecat':
				if(!isset($_REQUEST['id_cat']) && isset($_REQUEST['id_game']) && !empty($_REQUEST['id_game']) &&isset($_REQUEST['id_gc']) && !empty($_REQUEST['id_gc'])){
					$id_gc = $_REQUEST['id_gc'];
					$id_game = $_REQUEST['id_game'];
					deleteGameCat($id_gc,$id_game);
				}else if(!isset($_REQUEST['id_gc']) && isset($_REQUEST['id_game']) && !empty($_REQUEST['id_game']) && isset($_REQUEST['id_cat']) && !empty($_REQUEST['id_cat'])){
					$id_game = $_REQUEST['id_game'];
					$id_cat = $_REQUEST['id_cat'];
					insertGameCat($id_cat,$id_game);
				}else{
					header("location: index.php?p=listgames.php&e=Error al modificar las categorias");
				}
				break;
			case 'modperfil':
				$nombre = $_REQUEST['nombre'];
				$apellidos = $_REQUEST['apellidos'];
				$email = $_REQUEST['email'];
				$password = $_REQUEST['password'];
				updatePerfil($nombre, $apellidos, $email, $password,$_SESSION['emailA']);
				break;
			case 'deluser':
				$email = $_REQUEST['id_usr'];
				deleteUsuario($email,2);
				break;
			case 'deladmin':
				$email = $_REQUEST['id_usr'];
				deleteUsuario($email,1);
				break;
			case 'delcat':
				$id = $_REQUEST['id_cat'];
				deleteCategoria($id);
				break;
			case 'delnotice':
				$id = $_REQUEST['id_notice'];
				deleteNoticia($id);
				break;
			case 'delnovedad':
				$id = $_REQUEST['id_novedad'];
				deleteNovedad($id);
				break;
			case 'delgame':
				$id = $_REQUEST['id_game'];
				deleteGame($id);
				break;
			case 'addcat':
				$categoria = $_REQUEST['categoria'];
				$descripcion = $_REQUEST['descripcion'];
				insertCategoria($categoria, $descripcion);
				break;
			case 'addadmin':
				$nombre = $_REQUEST['nombre'];
				$apellidos = $_REQUEST['apellidos'];
				$email = $_REQUEST['email'];
				$password = $_REQUEST['password'];
				insertAdmin($nombre, $apellidos, $email, $password);
				break;
			case 'addnotice': 
				$img = "";   
		        if (is_uploaded_file($_FILES['portada']['tmp_name'])){
		            $tmp_name = $_FILES['portada']['tmp_name'];
		            $name="./images/notices/".rand (1 ,1000).$_FILES['portada']['name'];
		            move_uploaded_file($tmp_name,".".$name);
		            $img = $name;
		        }
				$titulo = $_REQUEST['titulo'];
				$resumen = $_REQUEST['resumen'];
				$enlace = $_REQUEST['enlace'];
				insertNotice($titulo, $resumen, $enlace, $img);
				break;
			case 'addnovedad': 
				$img = "";   
		        if (is_uploaded_file($_FILES['portada']['tmp_name'])){
		            $tmp_name = $_FILES['portada']['tmp_name'];
		            $name="./images/banners/".rand (1 ,1000).$_FILES['portada']['name'];
		            move_uploaded_file($tmp_name,".".$name);
		            $img = $name;
		        }
				$titulo = $_REQUEST['titulo'];
				$descripcion = $_REQUEST['descripcion'];
				$game = $_REQUEST['game'];
				insertNovedad($titulo, $descripcion, $game, $img);
				break;
			case 'addgame': 
				$img = "";   
		        if (is_uploaded_file($_FILES['portada']['tmp_name'])){
		            $tmp_name = $_FILES['portada']['tmp_name'];
		            $name="./images/banners/".rand (1 ,1000).$_FILES['portada']['name'];
		            move_uploaded_file($tmp_name,".".$name);
		            $img = $name;
		        }
				$titulo = $_REQUEST['titulo'];
				$descripcion = $_REQUEST['descripcion'];
				$precio = $_REQUEST['precio'];
				insertGame($titulo, $descripcion, $precio, $img);
				break;
			case 'modcat':
				$categoria = $_REQUEST['categoria'];
				$descripcion = $_REQUEST['descripcion'];
				$id = $_REQUEST['id_cat'];
				updateCategoria($categoria, $descripcion, $id);
				break;
			case 'modnotice':
				$img = "NOUPDATE";   
		        if (isset($_FILES['portada'])) {
		        	if (is_uploaded_file($_FILES['portada']['tmp_name'])){
			            $tmp_name = $_FILES['portada']['tmp_name'];
			            $name="./images/notices/".rand (1 ,1000).$_FILES['portada']['name'];
			            move_uploaded_file($tmp_name,".".$name);
			            $img = $name;
			        }
		        }
				$titulo = $_REQUEST['titulo'];
				$resumen = $_REQUEST['resumen'];
				$enlace = $_REQUEST['enlace'];
				$id = $_REQUEST['id_notice'];
				updateNoticia($titulo, $resumen, $enlace, $img, $id);
				break;
			case 'modnovedad':
				$img = "NOUPDATE";   
		        if (isset($_FILES['portada'])) {
		        	if (is_uploaded_file($_FILES['portada']['tmp_name'])){
			            $tmp_name = $_FILES['portada']['tmp_name'];
			            $name="./images/banners/".rand (1 ,1000).$_FILES['portada']['name'];
			            move_uploaded_file($tmp_name,".".$name);
			            $img = $name;
			        }
		        }
				$titulo = $_REQUEST['titulo'];
				$descripcion = $_REQUEST['descripcion'];
				$game = $_REQUEST['game'];
				$id = $_REQUEST['id_novedad'];
				updateNovedad($titulo, $descripcion, $game, $img, $id);
				break;
			case 'modgame':
				$img = "NOUPDATE";   
		        if (isset($_FILES['portada'])) {
		        	if (is_uploaded_file($_FILES['portada']['tmp_name'])){
			            $tmp_name = $_FILES['portada']['tmp_name'];
			            $name="./videojuegos/".rand (1 ,1000).$_FILES['portada']['name'];
			            move_uploaded_file($tmp_name,".".$name);
			            $img = $name;
			        }
		        }
				$titulo = $_REQUEST['titulo'];
				$descripcion = $_REQUEST['descripcion'];
				$precio = $_REQUEST['precio'];
				$oferta = $_REQUEST['oferta'];
				$prct = $_REQUEST['prct'];
				$id = $_REQUEST['id_game'];
				updateGame($titulo, $descripcion, $precio, $oferta, $prct, $img, $id);
				break;
			default:
				header("location: index.php?e=La accion que intestas realizar no esta disponible");
				break;
		}
	}else
		header("location: login.php");

?>