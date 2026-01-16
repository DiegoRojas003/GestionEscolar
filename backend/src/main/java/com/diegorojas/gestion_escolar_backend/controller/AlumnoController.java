package com.diegorojas.gestion_escolar_backend.controller;

import com.diegorojas.gestion_escolar_backend.domain.alumno.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;
import java.util.List;

@RestController
@RequestMapping("/alumnos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlumnoController {
    @Autowired
    AlumnoRepository alumnoRepository;

    @GetMapping
    public List<Alumno> getListAlumnos(){
        return alumnoRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Alumno> saveAlumno(@RequestBody @Valid DatosAlumno datosAlumno, UriComponentsBuilder uriComponentsBuilder){
        Alumno alumno = alumnoRepository.save(new Alumno(datosAlumno));
        return ResponseEntity.status(HttpStatus.CREATED).body(alumno);
    }
    @GetMapping("/{id}")
    public ResponseEntity<AlumnoResponse> getAlumnoById(@PathVariable Long id){
        Alumno alumno = alumnoRepository.getReferenceById(id);
        return ResponseEntity.ok(asignarDatosRespuesta(alumno));
    }
    @PutMapping("/{id}") // Agregamos la variable en la ruta
    @Transactional
    public ResponseEntity<AlumnoResponse> actualizarAlumno (@PathVariable Long id, @RequestBody @Valid DatosUpdateAlumno datosUpdateAlumno
    ){
        Alumno alumno = alumnoRepository.getReferenceById(id);
        alumno.actualizarDatos(datosUpdateAlumno);
        return ResponseEntity.ok(new AlumnoResponse(alumno.getNombre(), alumno.getApellido(), alumno.getEmail(), alumno.getFecha_nacimiento()));
    }
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarAlumno(@PathVariable Long id){
        Alumno alumno = alumnoRepository.getReferenceById(id);
        alumnoRepository.delete(alumno);
        return ResponseEntity.noContent().build();
    }
    public AlumnoResponse asignarDatosRespuesta(Alumno alumno){
        return (new AlumnoResponse(alumno.getNombre(),alumno.getApellido(),alumno.getEmail(),alumno.getFecha_nacimiento()));
    }
}
