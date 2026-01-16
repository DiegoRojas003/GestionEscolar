package com.diegorojas.gestion_escolar_backend.domain.alumno;

import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DatosUpdateAlumno(
        @NotNull Long id,
        String nombre,
        String apellido,
        String email,
        LocalDate fecha_nacimiento
) {
}
