package com.diegorojas.gestion_escolar_backend.domain.materia;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record DatosMateria(
        @NotBlank(message = "El nombre es obligatorio")
        String nombre,
        @NotBlank(message = "El codigo es obligatorio")
        String codigo,
        @NotNull(message = "Los creditos son obligatorios")
        Long creditos
) {
}
