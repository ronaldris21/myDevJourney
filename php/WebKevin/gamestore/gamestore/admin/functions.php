<?php
	@session_start();
	include_once("../conn.php");

	function validarLogin($email, $password, $tipo){
		$conn = db_connect();
		$sql = "SELECT * FROM usuarios WHERE email = '$email' and password = '$password' and tipo=$tipo";
	    $result = $conn -> query($sql);
	    $nr = $result -> num_rows;

	    if( $nr == 1) { 
	        while ($row = $result -> fetch_assoc()){
	            $_SESSION['admin'] = 'Administrador';	          
	            $_SESSION['emailA'] = $row['email'];
	            $_SESSION['nombreA'] = $row['nombre'];
	            $_SESSION['apellidosA'] = $row['apellidos'];
	            $_SESSION['passwordA'] = $row['password'];
	        }
	            header("location: index.php");
		} else {
				header("location: login.php?e=Usuario no encontrado!");
		}
	}
	function updatePerfil($nombre, $apellidos, $email, $password, $id){
		$conn = db_connect();
		
		$sql = "UPDATE usuarios SET nombre = '$nombre', apellidos = '$apellidos', email = '$email', password = '$password' WHERE email = '$id'";

	    if($conn -> query($sql)){
	    	$_SESSION['emailA'] = $email;
	        $_SESSION['nombreA'] = $nombre;
	        $_SESSION['apellidosA'] = $apellidos;
	        $_SESSION['passwordA'] = $password;
	    	header("location: index.php?p=modperfil.php&s=Perfil actualizado correctamente!");
	    }else
	    	header("location: index.php?p=modperfil.php&e=No se pudo actualizar el Perfil!");
	}

	function deleteGameCat($id, $game){
		$conn = db_connect();
		$sql = "DELETE FROM games_cat WHERE id_gc = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=gamescat.php&id_game=$game&s=Categoria eliminada correctamente!");
	    }else
	    	header("location: index.php?p=gamescat.php&id_game=$game&e=No se pudo eliminar la categoria!");
	}

	function insertGameCat($cat, $game){
		$conn = db_connect();
		$sql = "INSERT INTO games_cat (id_categoria, id_game) VALUES ($cat, $game)";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=gamescat.php&id_game=$game&s=Categoria seleccionada correctamente!");
	    }else
	    	header("location: index.php?p=gamescat.php&id_game=$game&e=No se pudo seleccionar la categoria!");
	}
	/*
		FUNCIONES DELETE DE LAS TABLAS

	*/
	function deleteUsuario($email,$tipo){
		$conn = db_connect();
		$sql = "DELETE FROM usuarios WHERE email = '$email'";
	    if($conn -> query($sql)){
	    	if($email == $_SESSION['emailA']){
	    		header("location: logout.php");
	    	}else if($tipo == 1){
	    		header("location: index.php?p=listadmins.php&s=Administrador eliminado correctamente!");
	    	}else{
	    		header("location: index.php?p=listusers.php&s=Cliente eliminado correctamente!");
	    	}
	    }else
	    	header("location: index.php?e=No se puedo eliminar el registro");
	}

	function deleteCategoria($id){
		$conn = db_connect();
		$sql = "DELETE FROM categorias WHERE id_cat = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listcat.php&s=Categoria eliminada correctamente!");
	    }else
	    	header("location: index.php?p=listcat.php&e=No se pudo eliminar la categoria!");
	}

	function deleteNoticia($id){
		$conn = db_connect();
		$sql = "DELETE FROM notices WHERE id_notice = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnotices.php&s=Noticia eliminada correctamente!");
	    }else
	    	header("location: index.php?p=listnotices.php&e=No se pudo eliminar la Noticia!");
	}

	function deleteNovedad($id){
		$conn = db_connect();
		$sql = "DELETE FROM novedades WHERE id_novedad = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnovedades.php&s=Novedad eliminada correctamente!");
	    }else
	    	header("location: index.php?p=listnovedades.php&e=No se pudo eliminar la Novedad!");
	}
	function deleteGame($id){
		$conn = db_connect();
		$sql = "DELETE FROM videojuegos WHERE id_game = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listgames.php&s=Videojuego eliminada correctamente!");
	    }else
	    	header("location: index.php?p=listgames.php&e=No se pudo eliminar el videojuego!");
	}

	//INSERTS
	function insertCategoria($categoria, $descripcion){
		$conn = db_connect();
		$sql = "INSERT INTO categorias (categoria, descripcion) VALUES ('$categoria', '$descripcion')";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listcat.php&s=Categoria agregada correctamente!");
	    }else
	    	header("location: index.php?p=addcat.php&e=No se pudo agregar la categoria!");
	}

	function insertNotice($titulo, $resumen, $enlace, $img){
		$conn = db_connect();
		$sql = "INSERT INTO notices (titulo_notice, resumen_notice, enlace_notice, portada_notice) VALUES ('$titulo', '$resumen', '$enlace', '$img')";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnotices.php&s=Noticia agregada correctamente!");
	    }else
	    	header("location: index.php?p=addnotice.php&e=No se pudo agregar la noticia!");
	}

	function insertNovedad($titulo, $descripcion, $game, $img){
		$conn = db_connect();
		$sql = "INSERT INTO novedades (titulo_corto, descripcion_banner, id_game, image_banner) VALUES ('$titulo', '$descripcion', $game, '$img')";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnovedades.php&s=Novedad agregada correctamente!");
	    }else
	    	header("location: index.php?p=addnovedad.php&e=No se pudo agregar la Novedad!");
	}
	function insertAdmin($nombre, $apellidos, $email, $password){
		$conn = db_connect();
		$sql = "INSERT INTO usuarios (nombre, apellidos, email, password, tipo) VALUES ('$nombre', '$apellidos', '$email', '$password',1)";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listadmins.php&s=Administrador agregado correctamente!");
	    }else
	    	header("location: index.php?p=addadmin.php&e=No se pudo agregar al administrador!");
	}
	function insertGame($titulo, $descripcion, $precio, $img){
		$conn = db_connect();
		$sql = "INSERT INTO videojuegos (nombre_game, precio, descripcion, oferta, prct_oferta, image) VALUES ('$titulo', $precio, '$descripcion', 0,0,'$img')";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listgames.php&s=Videojuego agregado correctamente!");
	    }else
	    	header("location: index.php?p=addgame.php&e=No se pudo agregar al videojuego!");
	}

	//UPDATES
	function updateCategoria($categoria, $descripcion, $id){
		$conn = db_connect();
		$sql = "UPDATE categorias SET categoria = '$categoria', descripcion = '$descripcion' WHERE id_cat = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listcat.php&s=Categoria actualizada correctamente!");
	    }else
	    	header("location: index.php?p=modcat.php&id_cat=$id&e=No se pudo actualizar la categoria!");
	}

	function updateNoticia($titulo, $resumen, $enlace, $img, $id){
		$conn = db_connect();
		if ($img == "NOUPDATE" || empty($img))
			$sql = "UPDATE notices SET titulo_notice = '$titulo', resumen_notice = '$resumen', enlace_notice = '$enlace' WHERE id_notice = $id";
		else
			$sql = "UPDATE notices SET titulo_notice = '$titulo', resumen_notice = '$resumen', enlace_notice = '$enlace', portada_notice = '$img' WHERE id_notice = $id";

	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnotices.php&s=Noticia actualizada correctamente!");
	    }else
	    	header("location: index.php?p=modnotice.php&id_notice=$id&e=No se pudo actualizar la Noticia!");
	}

	function updateNovedad($titulo, $descripcion, $game, $img, $id){
		$conn = db_connect();
		if ($img == "NOUPDATE" || empty($img))
			$sql = "UPDATE novedades SET titulo_corto = '$titulo', descripcion_banner = '$descripcion', id_game = $game  WHERE id_novedad = $id";
		else
			$sql = "UPDATE novedades SET titulo_corto = '$titulo', descripcion_banner = '$descripcion', id_game = $game , image_banner = '$img' WHERE id_novedad = $id";

	    if($conn -> query($sql)){
	    	header("location: index.php?p=listnovedades.php&s=Novedad actualizada correctamente!");
	    }else
	    	header("location: index.php?p=modnovedad.php&id_novedad=$id&e=No se pudo actualizar la Novedad!");
	}

	function updateGame($titulo, $descripcion, $precio, $oferta, $prct, $img, $id){
		$conn = db_connect();
		if ($img == "NOUPDATE" || empty($img))
			$setImg = "";
		else
			$setImg = ", image = '$img'";

		if ($oferta == 1 && $prct > 0)
			$setOfrt = ", oferta = 1, prct_oferta = $prct";
		else
			$setOfrt = ", oferta = 0, prct_oferta = 0";

		$sql = "UPDATE videojuegos SET nombre_game = '$titulo', precio = $precio, descripcion = '$descripcion' $setImg $setOfrt WHERE id_game = $id";
	    if($conn -> query($sql)){
	    	header("location: index.php?p=listgames.php&s=Juego actualizado correctamente!");
	    }else
	    	header("location: index.php?p=modgame.php&id_game=$id&e=No se pudo actualizar el videojuego!");
	}
?>