-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-12-2019 a las 07:49:35
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `charlie_brown`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cargos`
--

CREATE TABLE `cargos` (
  `id` int(11) NOT NULL,
  `monto_cargo` decimal(10,2) NOT NULL,
  `fecha_cargo` date NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cargos`
--

INSERT INTO `cargos` (`id`, `monto_cargo`, `fecha_cargo`, `id_usuario`) VALUES
(1, '75.00', '2019-12-03', 4),
(2, '100.00', '2019-12-02', 4),
(3, '1.00', '2020-01-10', 4),
(4, '1.00', '2020-02-01', 4),
(5, '100.00', '2020-02-01', 6),
(6, '100.00', '2020-02-01', 4),
(7, '100.00', '2020-02-01', 6),
(9, '100.00', '2020-02-01', 6),
(10, '100.00', '2020-02-01', 4),
(11, '12.00', '2020-02-01', 4),
(12, '12.00', '2020-02-01', 6),
(13, '1.00', '2020-01-02', 4),
(14, '1.00', '2020-01-02', 6),
(15, '750.00', '2019-12-31', 4),
(16, '750.00', '2019-12-31', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_estados`
--

CREATE TABLE `cat_estados` (
  `id` int(11) NOT NULL,
  `estado` varchar(45) DEFAULT NULL,
  `activo` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_estados`
--

INSERT INTO `cat_estados` (`id`, `estado`, `activo`) VALUES
(1, 'Aguascalientes', 1),
(2, 'Baja California', 1),
(3, 'Baja California Sur', 1),
(4, 'Campeche', 1),
(5, 'Coahuila', 1),
(6, 'Colima', 1),
(7, 'Chiapas', 1),
(8, 'Chihuahua', 1),
(9, 'Ciudad de México', 1),
(10, 'Durango', 1),
(11, 'Guanajuato', 1),
(12, 'Guerrero', 1),
(13, 'Hidalgo', 1),
(14, 'Jalisco', 1),
(15, 'Estado de México', 1),
(16, 'Michoacán', 1),
(17, 'Morelos', 1),
(18, 'Nayarit', 1),
(19, 'Nuevo León', 1),
(20, 'Oaxaca', 1),
(21, 'Puebla', 1),
(22, 'Querétaro', 1),
(23, 'Quintana Roo', 1),
(24, 'San Luis Potosí', 1),
(25, 'Sinaloa', 1),
(26, 'Sonora', 1),
(27, 'Tabasco', 1),
(28, 'Tamaulipas', 1),
(29, 'Tlaxcala', 1),
(30, 'Veracruz', 1),
(31, 'Yucatán', 1),
(32, 'Zacatecas', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_meses`
--

CREATE TABLE `cat_meses` (
  `id` int(11) NOT NULL,
  `mes` varchar(20) NOT NULL,
  `activo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_meses`
--

INSERT INTO `cat_meses` (`id`, `mes`, `activo`) VALUES
(1, 'Enero', 1),
(2, 'Febrero', 1),
(3, 'Marzo', 1),
(4, 'Abril', 1),
(5, 'Mayo', 1),
(6, 'Junio', 1),
(7, 'Julio', 1),
(8, 'Agosto', 1),
(9, 'Septiembre', 1),
(10, 'Octubre', 1),
(11, 'Noviembre', 1),
(12, 'Diciembre', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_sexo`
--

CREATE TABLE `cat_sexo` (
  `id_cat_sexo` int(11) NOT NULL,
  `sexo` varchar(100) COLLATE utf8_spanish_ci DEFAULT NULL,
  `activo` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `cat_sexo`
--

INSERT INTO `cat_sexo` (`id_cat_sexo`, `sexo`, `activo`) VALUES
(1, 'Hombre', 0),
(2, 'Mujer', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cat_tipo_permiso`
--

CREATE TABLE `cat_tipo_permiso` (
  `id` int(11) NOT NULL,
  `tipo_permiso` varchar(50) NOT NULL,
  `activo` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cat_tipo_permiso`
--

INSERT INTO `cat_tipo_permiso` (`id`, `tipo_permiso`, `activo`, `created_at`, `updated_at`) VALUES
(1, 'Administrador', 1, '2019-11-28 04:11:02', '2019-11-28 04:11:02'),
(2, 'Estandar', 1, '2019-11-28 04:11:10', '2019-11-28 04:11:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pagos`
--

CREATE TABLE `pagos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `monto_pago` decimal(10,2) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `fecha_pago` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `pagos`
--

INSERT INTO `pagos` (`id`, `id_usuario`, `monto_pago`, `id_cargo`, `fecha_pago`) VALUES
(10, 4, '100.00', 2, '2019-12-01'),
(11, 4, '75.00', 1, '2019-12-01');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saldos`
--

CREATE TABLE `saldos` (
  `id` int(11) NOT NULL,
  `fecha_saldo` datetime NOT NULL,
  `monto_saldo` decimal(10,2) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `saldos`
--

INSERT INTO `saldos` (`id`, `fecha_saldo`, `monto_saldo`, `id_usuario`) VALUES
(1, '2019-12-01 00:00:00', '750.00', 4),
(3, '2019-12-01 23:04:34', '100.00', 4),
(4, '2019-12-01 23:34:20', '100.00', 4),
(5, '2019-12-01 23:35:37', '1.00', 4),
(6, '2019-12-01 23:52:46', '1.00', 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` int(11) NOT NULL,
  `id_cat_sexo` int(11) DEFAULT NULL,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `nombre` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_paterno` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `apellido_materno` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `foto` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `token` varchar(200) CHARACTER SET utf8 COLLATE utf8_spanish_ci DEFAULT NULL,
  `expiracion` timestamp NULL DEFAULT NULL ON UPDATE current_timestamp(),
  `id_cat_tipo_permiso` int(11) DEFAULT NULL,
  `id_cat_estado` int(11) DEFAULT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `direccion` varchar(500) DEFAULT NULL,
  `saldo` decimal(10,2) DEFAULT NULL,
  `rfc` varchar(18) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `id_cat_sexo`, `username`, `password`, `nombre`, `apellido_paterno`, `apellido_materno`, `foto`, `token`, `expiracion`, `id_cat_tipo_permiso`, `id_cat_estado`, `telefono`, `email`, `direccion`, `saldo`, `rfc`) VALUES
(1, 2, 'admin', 'admin', 'Carlos Alberto', 'Medina', 'Medina', 'files/foto-c4ca4238a0b923820dcc509a6f75849b1573760192.png', '2095c92fc9ef1e177775da663ef9fdc6', '2019-12-02 07:14:29', 1, 7, '9612339116', 'ing_medina@hotmail.com', '19 Sur Oriente', '1549.00', NULL),
(4, 1, 'estandar1', '123123', 'Carlos Alberto', 'Medina', 'Arias', 'files/foto-a87ff679a2f3e71d9181a67b7542122c1573756369.png', '04cd330e1e3eb777920e61191d5c9ab2', '2019-12-02 07:16:16', 2, 11, '9616549876', 'usuario1@yokerts.com', '10 sur #23', '7870.00', 'MEAC890816HCSDD00'),
(5, 1, 'aaaaa', 'bbbb', 'cccccc', 'dddddd', 'eeeee', NULL, NULL, '2019-12-01 03:17:07', 1, 7, '9612322323', 'asdasd@asdasd.com', NULL, '1549.00', NULL),
(6, 1, 'estandar2', '123123', 'Estandar2', 'Estandar22', 'Estandar222', NULL, NULL, '2019-12-01 03:17:07', 2, 12, 'ffffff', 'asdasd@asdasd.com', 'hhhh', '112660.00', NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cat_mes` (`fecha_cargo`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `cat_estados`
--
ALTER TABLE `cat_estados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cat_meses`
--
ALTER TABLE `cat_meses`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `cat_sexo`
--
ALTER TABLE `cat_sexo`
  ADD PRIMARY KEY (`id_cat_sexo`);

--
-- Indices de la tabla `cat_tipo_permiso`
--
ALTER TABLE `cat_tipo_permiso`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `saldos`
--
ALTER TABLE `saldos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `id_sexo` (`id_cat_sexo`),
  ADD KEY `id_tipo_permiso` (`id_cat_tipo_permiso`),
  ADD KEY `id_estado` (`id_cat_estado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cargos`
--
ALTER TABLE `cargos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `cat_meses`
--
ALTER TABLE `cat_meses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `cat_sexo`
--
ALTER TABLE `cat_sexo`
  MODIFY `id_cat_sexo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `cat_tipo_permiso`
--
ALTER TABLE `cat_tipo_permiso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pagos`
--
ALTER TABLE `pagos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `saldos`
--
ALTER TABLE `saldos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cargos`
--
ALTER TABLE `cargos`
  ADD CONSTRAINT `cargos_ibfk_2` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `pagos`
--
ALTER TABLE `pagos`
  ADD CONSTRAINT `pagos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `saldos`
--
ALTER TABLE `saldos`
  ADD CONSTRAINT `saldos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `usuario_ibfk_1` FOREIGN KEY (`id_cat_sexo`) REFERENCES `cat_sexo` (`id_cat_sexo`),
  ADD CONSTRAINT `usuario_ibfk_2` FOREIGN KEY (`id_cat_tipo_permiso`) REFERENCES `cat_tipo_permiso` (`id`),
  ADD CONSTRAINT `usuario_ibfk_3` FOREIGN KEY (`id_cat_estado`) REFERENCES `cat_estados` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
