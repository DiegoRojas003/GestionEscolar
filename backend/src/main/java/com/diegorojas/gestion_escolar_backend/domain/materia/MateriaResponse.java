package com.diegorojas.gestion_escolar_backend.domain.materia;

public record MateriaResponse(
    String nombre,
    String codigo,
    Long creditos
) {
}
