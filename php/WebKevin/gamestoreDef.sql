-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-06-2021 a las 17:15:03
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gamestore`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carritos`
--

CREATE TABLE `carritos` (
  `id_carrito` int(11) NOT NULL,
  `email_user` varchar(50) COLLATE utf8_bin NOT NULL,
  `id_game` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `carritos`
--

INSERT INTO `carritos` (`id_carrito`, `email_user`, `id_game`, `cantidad`) VALUES
(35, 'kztyllo@gmail.com', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_cat` int(11) NOT NULL,
  `categoria` varchar(50) COLLATE utf8_bin NOT NULL,
  `descripcion` varchar(1500) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_cat`, `categoria`, `descripcion`) VALUES
(1, 'Acción', 'Videojuegos violentos'),
(2, 'Deportes', 'Vive la pasión de un deporte desde la comodidad de tu casa'),
(3, 'Terror', 'Si eres un fanático del miedo, prueba estas entregas que seguro te sacan un susto'),
(4, 'Guerra', 'Conviertete en un soldado en tus tiempos libres!'),
(5, 'Carreras', 'Ve por ese primer puesto'),
(6, 'Rol', 'Conviértete en el personaje, mejora, sufre, llora, ríe, y disfruta con el.'),
(7, 'FPS', 'Juegos de disparos donde la cámara es primera persona');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `deseos`
--

CREATE TABLE `deseos` (
  `email_user` varchar(50) COLLATE utf8_bin NOT NULL,
  `id_deseo` int(11) NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direcciones`
--

CREATE TABLE `direcciones` (
  `id_direccion` int(11) NOT NULL,
  `email_user` varchar(50) COLLATE utf8_bin NOT NULL,
  `calle` varchar(300) COLLATE utf8_bin NOT NULL,
  `num_calle` int(10) UNSIGNED NOT NULL,
  `piso` int(10) UNSIGNED NOT NULL,
  `puerta` varchar(5) COLLATE utf8_bin NOT NULL,
  `cpost` int(5) NOT NULL,
  `provincia` varchar(25) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `direcciones`
--

INSERT INTO `direcciones` (`id_direccion`, `email_user`, `calle`, `num_calle`, `piso`, `puerta`, `cpost`, `provincia`) VALUES
(3, 'kztyllo@gmail.com', 'Mariano Ruiz Funes', 14, 4, 'Dcha', 30007, 'Murcia'),
(8, 'mada@gmail.com', 'aaaa', 1, 1, '1', 10000, 'Álava/Araba');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `games_cat`
--

CREATE TABLE `games_cat` (
  `id_gc` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `games_cat`
--

INSERT INTO `games_cat` (`id_gc`, `id_categoria`, `id_game`) VALUES
(5, 1, 1),
(1, 1, 2),
(3, 1, 3),
(9, 1, 4),
(12, 1, 6),
(11, 1, 7),
(16, 1, 8),
(15, 1, 9),
(14, 1, 10),
(21, 1, 15),
(8, 2, 12),
(13, 3, 6),
(7, 3, 11),
(2, 4, 2),
(4, 4, 3),
(6, 5, 13),
(18, 6, 1),
(17, 6, 5),
(19, 6, 7),
(20, 6, 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `game_pedidos`
--

CREATE TABLE `game_pedidos` (
  `id_game_pdd` int(11) NOT NULL,
  `id_game` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `review` text COLLATE utf8_bin DEFAULT NULL,
  `stars` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `game_pedidos`
--

INSERT INTO `game_pedidos` (`id_game_pdd`, `id_game`, `id_pedido`, `review`, `stars`, `cantidad`) VALUES
(1, 1, 8, NULL, NULL, 2),
(2, 6, 8, NULL, NULL, 1),
(3, 4, 9, NULL, NULL, 1),
(4, 10, 10, 'Entretenido, pero el original de 2002 es claramente superior a este remake', 4, 1),
(5, 2, 11, NULL, NULL, 2),
(6, 1, 11, 'Buenos grafico, entretenido, y buena historia pero demasiadas secundarias', 3, 1),
(7, 8, 13, 'Gran videojuego', 5, 1),
(8, 10, 13, NULL, NULL, 1),
(9, 10, 14, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notices`
--

CREATE TABLE `notices` (
  `id_notice` int(11) NOT NULL,
  `titulo_notice` varchar(200) COLLATE utf8_bin NOT NULL,
  `resumen_notice` text COLLATE utf8_bin NOT NULL,
  `enlace_notice` text COLLATE utf8_bin NOT NULL,
  `portada_notice` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `notices`
--

INSERT INTO `notices` (`id_notice`, `titulo_notice`, `resumen_notice`, `enlace_notice`, `portada_notice`) VALUES
(1, 'Mass Effect Legendary Edition se actualiza con mejoras en los tres videojuegos', 'Electronic Arts y BioWare han anunciado que Mass Effect Legendary Edition se ha actualizado con el parche de junio. Desde ayer día 7 todos los jugadores tienen la opción descargarlo, por lo que el recopilatorio se reforzará con mejoras de calidad y de rendimiento en todos los títulos y contenidos, tal y como ha informado la desarrolladora canadiense en su página web.', 'https://as.com/meristation/2021/06/08/noticias/1623152279_629852.html', './images/notices/notice_masseffectle.jpg'),
(2, 'E3 2021 | Previa de la conferencia de Microsoft (Xbox) y Bethesda: posibles juegos, duración y más', 'La conferencia de Xbox en el E3 2021 no será igual que la de otros años, principalmente porque en la ecuación hemos de sumar también a Bethesda, que ya forma parte de la familia Xbox Game Studios. El llamado Xbox & Bethesda Games Showcase se celebrará este domingo 13 de junio a partir de las 19:00 horario peninsular de España, momento en que dará comienzo una retransmisión de unos 90 minutos donde veremos los próximos juegos de Xbox, de Bethesda y de Xbox Game Pass.', 'https://as.com/meristation/2021/06/09/noticias/1623229618_228890.html', './images/notices/notice2.jpg'),
(3, 'Todo lo que sabemos de Battlefield 2042, el próximo FPS de DICE para PS5, Xbox Series y PC', 'Desde finales de 2018, tras el lanzamiento de Battlefield V, llevamos esperando a que salga al mercado su sucesor, titulado oficialmente Battlefield 2042. Y por fin sabemos que saldrá este 2021 tras su primera presentación oficial del 9 de junio', 'https://www.vidaextra.com/juegos-nuevos/nuevo-battlefield-6-para-pc-ps5-xbox-series-fecha-lanzamiento-ultimas-noticias-rumores', './images/notices/612battlefield2042.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id_novedad` int(11) NOT NULL,
  `titulo_corto` varchar(100) COLLATE utf8_bin NOT NULL,
  `descripcion_banner` text COLLATE utf8_bin NOT NULL,
  `image_banner` text COLLATE utf8_bin NOT NULL,
  `id_game` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id_novedad`, `titulo_corto`, `descripcion_banner`, `image_banner`, `id_game`) VALUES
(1, 'Super Oferta Limitada!', 'Aprovecha este super oferta y disfruta de esta entrega de DOOM.', './images/banners/doombannerofert.jpg', 6),
(2, 'Ya ha llegado a nuestra tienda', 'Disfruta de la nueva entrega de nuestro Lombax favorito', './images/banners/179RiftApartBanner.jpg', 15);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id_pedido` int(11) NOT NULL,
  `total` float UNSIGNED NOT NULL,
  `email_user` varchar(50) COLLATE utf8_bin NOT NULL,
  `id_tarjeta` int(11) DEFAULT NULL,
  `id_direccion` int(11) NOT NULL,
  `pago_externo` int(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id_pedido`, `total`, `email_user`, `id_tarjeta`, `id_direccion`, `pago_externo`) VALUES
(8, 119.98, 'kztyllo@gmail.com', NULL, 3, -2),
(9, 49.99, 'kztyllo@gmail.com', 3, 3, NULL),
(10, 9.99, 'mike@gmail.com', NULL, 4, -1),
(11, 129.97, 'mike@gmail.com', NULL, 4, -1),
(13, 29.98, 'simpson@gmail.com', 6, 7, NULL),
(14, 9.99, 'mada@gmail.com', NULL, 8, -1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarjetas`
--

CREATE TABLE `tarjetas` (
  `id_tarjeta` int(11) NOT NULL,
  `numero` varchar(16) COLLATE utf8_bin NOT NULL,
  `vencimiento` varchar(5) COLLATE utf8_bin NOT NULL,
  `titular` varchar(80) COLLATE utf8_bin NOT NULL,
  `code` int(3) NOT NULL,
  `email_user` varchar(50) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `tarjetas`
--

INSERT INTO `tarjetas` (`id_tarjeta`, `numero`, `vencimiento`, `titular`, `code`, `email_user`) VALUES
(3, '4100000000000002', '05/28', 'Kevin Castillo', 121, 'kztyllo@gmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL,
  `nombre` varchar(20) COLLATE utf8_bin NOT NULL,
  `apellidos` varchar(35) COLLATE utf8_bin NOT NULL,
  `tipo` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `password`, `nombre`, `apellidos`, `tipo`) VALUES
('cliente@gmail.com', 'prueba', 'Homer', 'Simpson', 2),
('kztyllo@gmail.com', 'prueba', 'Kevin Roberto', 'Castillo Morales', 2),
('mada@gmail.com', 'mada', 'Mada', 'Cantabella', 1),
('mike@gmail.com', 'prueba', 'Mike', 'Anton Valer', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videojuegos`
--

CREATE TABLE `videojuegos` (
  `id_game` int(11) NOT NULL,
  `nombre_game` varchar(100) COLLATE utf8_bin NOT NULL,
  `precio` float(6,2) NOT NULL,
  `descripcion` text COLLATE utf8_bin NOT NULL,
  `oferta` int(11) NOT NULL DEFAULT 0,
  `prct_oferta` int(11) NOT NULL,
  `image` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `videojuegos`
--

INSERT INTO `videojuegos` (`id_game`, `nombre_game`, `precio`, `descripcion`, `oferta`, `prct_oferta`, `image`) VALUES
(1, 'Assassins Creed Origins', 49.99, 'Ambientado en el misterioso Antiguo Egipto, Assassin\'s Creed® Origins es un nuevo comienzo. Experimenta una nueva manera de luchar mientras exploras las grandes pirámides y las tumbas ocultas por todo el país en el Antiguo Egipto, y descubre muchas tramas memorables a lo largo de tu viaje. Y desvela la historia del origen de la Hermandad de los Asesinos.', 0, 0, './videojuegos/assassinscreedorigins.jpg'),
(2, 'Battlefield 1', 39.99, 'REVOLUCIONA TU FORMA DE JUGAR\r\nBattlefield 1 te transporta a los inicios de la guerra total, donde no hay dos batallas iguales. Alístate en Battlefield 1 Revolution y revoluciona tu forma de jugar con acceso a nuevos mapas, nuevos modos y nuevos conflictos.', 0, 0, './videojuegos/battlefield1.jpg'),
(3, 'Battlefiel 3 Aftermath', 54.99, 'Vive una nueva clase de combate urbano. Con vuestras capacidades operativas en riesgo y un impredecible terreno que se derrumba, tu equipo y tú deberéis adaptaros si queréis sobrevivir.\r\n\r\nAftermath es uno de los cinco packs de expansión de Battlefield 3 Premium. Si ya tienes Battlefield 3 Premium, recibirás acceso a este contenido de manera automática.', 0, 0, './videojuegos/battlefield3.jpg'),
(4, 'Darksiders II', 49.99, 'Darksiders II se lleva a cabo en paralelo a el juego anterior. En el prólogo, se revela que los cuatro jinetes (Guerra, Furia, Muerte y Disputa) son los últimos de los Nefilim, las fusiones de ángeles y demonios que libraron una guerra sangrienta en el resto de la creación, con el fin de preservar el equilibrio del Universo, ordenados por el Consejo Abrasado, recibirían increíbles poderes a cambio de sacrificar al resto de los Nefilim. Muerte atrapó las almas de sus hermanos caídos en un amuleto, ganando el título de Fratricida, Ejecutor, etc. Y dando el amuleto al padre cuervo (aunque mantuvo esta acción en secreto, ya que el Consejo ordenó destruir las almas de los Nefilim). ', 0, 0, './videojuegos/darksidersii.jpg'),
(5, 'Dark Souls Remastered', 65.00, 'Dark Souls tiene lugar en el reino ficticio llamado Lordran. Los jugadores toman el papel de un personaje humano maldito que ha sido elegido para realizar un peregrinaje para descubrir el destino de los no muertos. El argumento del juego se va contando fundamentalmente a través de descripciones de objetos del juego, y diálogos con personajes no jugables (PNJs). Los jugadores deben ir reuniendo pistas para poder entender la historia. Dark Souls se labró un gran reconocimiento por su extenuante dificultad e implacable desafío. El mundo del juego está lleno de armas, armaduras y objetos consumibles que tienen como objetivo ayudar al jugador durante su viaje. ', 0, 0, './videojuegos/darksoulsremastered.jpg'),
(6, 'DOOM', 39.99, 'Una campaña implacable: En tu lucha contra las hordas demoníacas del infierno, no podrás buscar cobertura o parar para regenerar tu salud. Combina tu arsenal de armas convencionales y futuristas, tus mejoras, tu movilidad y un avanzado sistema de cuerpo a cuerpo para derribar, acuchillar, pisotear, aplastar y destruir a los demonios de forma creativa y violenta. ', 1, 50, './videojuegos/doom.JPG'),
(7, 'GodFall', 50.00, 'Aperion está al borde de la ruina. Eres uno de los últimos caballeros valorianos, guerreros divinos capaces de usar las armaduras legendarias conocidas como Valorplates, que transforman a quienes las llevan en maestros imparables del combate cuerpo a cuerpo. Aplasta a tus enemigos para remontar los reinos elementales y desafiar a Macros, el dios loco que aguarda en la cima. Asciende en Godfall, el primer RPG de acción looter-slasher centrado en el combate cuerpo a cuerpo.', 1, 10, './videojuegos/godfall.jpg'),
(8, 'Tomb Raider', 19.99, 'La secuencia de aventuras y acción que hace que Lara Croft pase de ser una joven inexperta a una dura superviviente ha sido renovada para las consolas de nueva generación, e incluye a una Lara detallada al milímetro y un mundo increíblemente realista. Lara debe resistir en combates explosivos, personalizar sus armas y su equipo y superar escenarios agotadores para sobrevivir a su primera aventura y descubrir el secreto mortal de la isla.', 0, 0, './videojuegos/tombraider.jpg'),
(9, 'Watch Dogs 2', 45.00, 'Juega como Marcus Holloway, un hacker brillante que vive en la cuna de la revolución tecnológica, en la bahía de San Francisco.\r\nColabora con DedSec, un conocido grupo de hackers, para ejecutar el mayor pirateo de la historia acaba con ctOS 2.0, un sistema operativo utilizado por un grupo de genios criminales para vigilar y manipular a los ciudadanos.', 0, 0, './videojuegos/watchdogs2.jpg'),
(10, 'Ratchet & Clank', 19.99, 'Únete al popular Lombax y a su compañero robótico en un nuevo juego que reescribe la frenética historia original de esta valorosa pareja.', 1, 50, './videojuegos/rachetclank.jpg'),
(11, 'Resident Evil Village', 69.99, 'Resident Evil Village tiene como objetivo crear una innovadora experiencia de survival horror como nunca antes. Años después de la pesadilla, Ethan Winters ha conseguido cierta estabilidad y una vida normal con su familia. Una vida que no tardará en ser destruida por un héroe de antaño, Chris Redfield.', 1, 30, './videojuegos/rev.jpg'),
(12, 'Fifa 21', 30.00, 'Mejor simulador de futbol de la historia', 0, 0, './videojuegos/fifa21.jpg'),
(13, 'Forza Horizon 4', 19.99, 'Forza Horizon 4, como videojuego de conducción en mundo abierto, apuesta en esta ocasión por trasladarnos a Reino Unido. ... Cada estación incluye desafíos y objetivos exclusivos que nos invitan a cambiar y dominar todos los tipos de conducción y coches imaginables.', 0, 0, './videojuegos/fh4.jpg'),
(15, 'Ratchet & Clank Una Dimension Aparte', 69.99, 'Viaja entre dimensiones con Ratchet y Clank en su lucha contra un malvado emperador de otra realidad. Salta entre mundos cargados de acción y más allá a velocidades de vértigo, con unos gráficos espectaculares y un arsenal demencial en el estreno de estos aventureros intergalácticos en la consola PS5™.', 0, 0, './videojuegos/176riftApart.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD PRIMARY KEY (`id_carrito`),
  ADD KEY `fk_carrito_game` (`id_game`),
  ADD KEY `fk_carrito_user` (`email_user`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_cat`);

--
-- Indices de la tabla `deseos`
--
ALTER TABLE `deseos`
  ADD PRIMARY KEY (`id_deseo`),
  ADD KEY `fk_deseos_user` (`email_user`),
  ADD KEY `fk_deseos_game` (`id_game`);

--
-- Indices de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD PRIMARY KEY (`id_direccion`),
  ADD KEY `fk_dir_users` (`email_user`);

--
-- Indices de la tabla `games_cat`
--
ALTER TABLE `games_cat`
  ADD PRIMARY KEY (`id_gc`),
  ADD UNIQUE KEY `id_categoria` (`id_categoria`,`id_game`),
  ADD KEY `fk_game_cg` (`id_game`);

--
-- Indices de la tabla `game_pedidos`
--
ALTER TABLE `game_pedidos`
  ADD PRIMARY KEY (`id_game_pdd`),
  ADD KEY `fk_game_ped` (`id_game`),
  ADD KEY `fk_ped_game` (`id_pedido`);

--
-- Indices de la tabla `notices`
--
ALTER TABLE `notices`
  ADD PRIMARY KEY (`id_notice`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id_novedad`),
  ADD KEY `fk_game_novedad` (`id_game`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id_pedido`);

--
-- Indices de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD PRIMARY KEY (`id_tarjeta`),
  ADD UNIQUE KEY `numero` (`numero`),
  ADD KEY `fk_tar_user` (`email_user`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `videojuegos`
--
ALTER TABLE `videojuegos`
  ADD PRIMARY KEY (`id_game`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `carritos`
--
ALTER TABLE `carritos`
  MODIFY `id_carrito` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=56;

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_cat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `deseos`
--
ALTER TABLE `deseos`
  MODIFY `id_deseo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `direcciones`
--
ALTER TABLE `direcciones`
  MODIFY `id_direccion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `games_cat`
--
ALTER TABLE `games_cat`
  MODIFY `id_gc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `game_pedidos`
--
ALTER TABLE `game_pedidos`
  MODIFY `id_game_pdd` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `notices`
--
ALTER TABLE `notices`
  MODIFY `id_notice` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id_novedad` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  MODIFY `id_tarjeta` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `videojuegos`
--
ALTER TABLE `videojuegos`
  MODIFY `id_game` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `carritos`
--
ALTER TABLE `carritos`
  ADD CONSTRAINT `fk_carrito_game` FOREIGN KEY (`id_game`) REFERENCES `videojuegos` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_carrito_user` FOREIGN KEY (`email_user`) REFERENCES `usuarios` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `deseos`
--
ALTER TABLE `deseos`
  ADD CONSTRAINT `fk_deseos_game` FOREIGN KEY (`id_game`) REFERENCES `videojuegos` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_deseos_user` FOREIGN KEY (`email_user`) REFERENCES `usuarios` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `direcciones`
--
ALTER TABLE `direcciones`
  ADD CONSTRAINT `fk_dir_users` FOREIGN KEY (`email_user`) REFERENCES `usuarios` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `games_cat`
--
ALTER TABLE `games_cat`
  ADD CONSTRAINT `fk_cat_cg` FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`id_cat`),
  ADD CONSTRAINT `fk_game_cg` FOREIGN KEY (`id_game`) REFERENCES `videojuegos` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `game_pedidos`
--
ALTER TABLE `game_pedidos`
  ADD CONSTRAINT `fk_game_ped` FOREIGN KEY (`id_game`) REFERENCES `videojuegos` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_ped_game` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id_pedido`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `fk_game_novedad` FOREIGN KEY (`id_game`) REFERENCES `videojuegos` (`id_game`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarjetas`
--
ALTER TABLE `tarjetas`
  ADD CONSTRAINT `fk_tar_user` FOREIGN KEY (`email_user`) REFERENCES `usuarios` (`email`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
