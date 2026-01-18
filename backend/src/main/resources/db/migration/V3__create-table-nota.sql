CREATE TABLE IF NOT EXISTS nota(
    id BIGINT NOT NULL AUTO_INCREMENT,
    valor DECIMAL(10,2) NOT NULL,
    fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    alumno_id BIGINT NOT NULL,
    materia_id BIGINT NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_nota_alumno_id FOREIGN KEY(alumno_id) REFERENCES alumno(id),
    CONSTRAINT fk_nota_materia_id FOREIGN KEY(materia_id) REFERENCES materia(id)
);