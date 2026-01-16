package com.diegorojas.gestion_escolar_backend.domain.alumno;

import java.time.LocalDate;

public record AlumnoResponse(
        String nombre,
        String apellido,
        String email,
        LocalDate fecha_nacimiento
) {
}
