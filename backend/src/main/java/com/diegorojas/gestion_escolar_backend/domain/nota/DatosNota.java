package com.diegorojas.gestion_escolar_backend.domain.nota;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record DatosNota(
        double valor,
        @NotNull
        Long alumno_id,
        @NotNull
        Long materia_id
) {
}
