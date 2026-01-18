-- Crear tablas si no existen (Estructura base para que el INSERT no falle)
CREATE TABLE IF NOT EXISTS `alumno` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS materia (
    id BIGINT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    codigo VARCHAR(100) NOT NULL UNIQUE,
    creditos BIGINT NOT NULL,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

CREATE TABLE IF NOT EXISTS nota (
    id BIGINT NOT NULL AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    fecha_registro DATE DEFAULT (CURRENT_DATE),
    alumno_id BIGINT NOT NULL,
    materia_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_nota_alumno_id FOREIGN KEY(alumno_id) REFERENCES alumno(id),
    CONSTRAINT fk_nota_materia_id FOREIGN KEY(materia_id) REFERENCES materia(id)
) ENGINE=InnoDB;

-- Insertar Datos
INSERT INTO `alumno` (id, nombre, apellido, email, fecha_nacimiento) VALUES 
(1,'Armando','Penagos','alejandro@example.com','2003-07-08'),
(2,'Alejandro','Rojas','rojas@example.com','2003-07-08'),
(3,'Gloria','Arias','arias@example.com','2003-07-08'),
(4,'Hernando','Castro','her@example.com','2003-07-08');

INSERT INTO `materia` (id, nombre, codigo, creditos) VALUES 
(1,'Español','COESP2','3'),
(2,'Matemáticas','COMAT2','4');

INSERT INTO `nota` (id, valor, fecha_registro, alumno_id, materia_id) VALUES 
(1, 8.50, '2026-01-16 00:00:00', 1, 1),
(2, 8.50, '2026-01-16 00:00:00', 1, 2),
(3, 10.00, '2026-01-16 00:00:00', 2, 1),
(4, 2.50, '2026-01-16 00:00:00', 2, 2),
(5, 2.50, '2026-01-16 00:00:00', 2, 2);