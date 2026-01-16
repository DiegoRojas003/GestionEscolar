package com.diegorojas.gestion_escolar_backend.domain.materia;

import jakarta.validation.constraints.NotNull;

public record DatosUpdateMateria(
        @NotNull
        Long id,
        String nombre,
        String codigo,
        Long creditos
) {
}
