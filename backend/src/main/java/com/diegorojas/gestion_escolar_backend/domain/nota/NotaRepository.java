package com.diegorojas.gestion_escolar_backend.domain.nota;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface NotaRepository extends JpaRepository<Nota,Long> {
    List<Nota> findByAlumnoId(Long idAlumno);
}
