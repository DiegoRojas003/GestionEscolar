package com.diegorojas.gestion_escolar_backend.domain.nota;

import com.diegorojas.gestion_escolar_backend.domain.alumno.Alumno;
import com.diegorojas.gestion_escolar_backend.domain.materia.Materia;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "nota")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of="id")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double valor;
    private LocalDate fecha_registro;

    @ManyToOne
    @JoinColumn(name = "alumno_id")
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "materia_id")
    private Materia materia;

    public Nota(DatosNota datosNota, Alumno alumno, Materia materia) {
        this.valor = datosNota.valor();
        this.fecha_registro = LocalDate.now();
        this.alumno = alumno;
        this.materia = materia;
    }
}
