package com.diegorojas.gestion_escolar_backend.domain.alumno;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Table(name = "alumno")
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Alumno {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre;
    private String apellido;
    private String email;
    private LocalDate fecha_nacimiento;

    public Alumno(DatosAlumno datosAlumno){
        this.nombre = datosAlumno.nombre();
        this.apellido = datosAlumno.apellido();
        this.email = datosAlumno.email();
        this.fecha_nacimiento = datosAlumno.fecha_nacimiento();
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getApellido() {
        return apellido;
    }

    public void setApellido(String apellido) {
        this.apellido = apellido;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getFecha_nacimiento() {
        return fecha_nacimiento;
    }

    public void setFecha_nacimiento(LocalDate fecha_nacimiento) {
        this.fecha_nacimiento = fecha_nacimiento;
    }

    public void actualizarDatos(@Valid DatosUpdateAlumno datosUpdateAlumno) {
        if(datosUpdateAlumno.nombre() != null){
            this.nombre = datosUpdateAlumno.nombre();
        }
        if(datosUpdateAlumno.apellido() != null){
            this.apellido = datosUpdateAlumno.apellido();
        }
        if(datosUpdateAlumno.email() != null){
            this.email = datosUpdateAlumno.email();
        }
        if(datosUpdateAlumno.fecha_nacimiento() != null){
            this.fecha_nacimiento = datosUpdateAlumno.fecha_nacimiento();
        }
    }
}
