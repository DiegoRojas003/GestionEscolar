package com.diegorojas.gestion_escolar_backend.domain.alumno;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.time.LocalDate;

public record DatosAlumno(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @NotBlank(message = "El apellido es obligatorio")
        String apellido,
        @NotBlank(message = "El correo es obligatorio")
        @Email(message = "Email invalido")
        String email,
        LocalDate fecha_nacimiento
) {
}
