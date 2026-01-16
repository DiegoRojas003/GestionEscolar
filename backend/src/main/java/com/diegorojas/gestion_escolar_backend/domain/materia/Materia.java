package com.diegorojas.gestion_escolar_backend.domain.materia;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "materia")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Materia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String codigo;
    private Long creditos;

    public Materia(@Valid DatosMateria datosMateria) {
        this.nombre = datosMateria.nombre();
        this.codigo = datosMateria.codigo();
        this.creditos = datosMateria.creditos();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Long getCreditos() {
        return creditos;
    }

    public void setCreditos(Long creditos) {
        this.creditos = creditos;
    }

    public void actualizarDatos(DatosUpdateMateria datosUpdateMateria) {
        this.nombre = datosUpdateMateria.nombre();
        this.codigo = datosUpdateMateria.codigo();
        this.creditos = datosUpdateMateria.creditos();
    }
}
