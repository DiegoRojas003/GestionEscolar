package com.diegorojas.gestion_escolar_backend.controller;

import com.diegorojas.gestion_escolar_backend.domain.materia.*;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/materia")
@CrossOrigin(origins = "http://localhost:5173")
public class MateriaController {
    @Autowired
    MateriaRepository materiaRepository;

    @GetMapping
    public List<Materia> getListMaterias(){
        return materiaRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Materia> saveMateria(@RequestBody @Valid DatosMateria datosMateria){
        Materia materia = materiaRepository.save(new Materia(datosMateria));
        return ResponseEntity.status(HttpStatus.CREATED).body(materia);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MateriaResponse> getMateriaById(@PathVariable Long id){
        Materia materia = materiaRepository.getReferenceById(id);
        return ResponseEntity.ok(asignarDatosRespuesta(materia));
    }
    @PutMapping
    @Transactional
    public ResponseEntity<MateriaResponse> actualizarMateria(@RequestBody @Valid DatosUpdateMateria datosUpdateMateria){
        Materia materia = materiaRepository.getReferenceById(datosUpdateMateria.id());
        materia.actualizarDatos(datosUpdateMateria);
        return ResponseEntity.ok(new MateriaResponse(materia.getNombre(), materia.getCodigo(), materia.getCreditos()));
    }
    @DeleteMapping("/{id}")
    @Transactional
    public ResponseEntity eliminarMateria(@PathVariable Long id){
        Materia materia = materiaRepository.getReferenceById(id);
        materiaRepository.delete(materia);
        return ResponseEntity.noContent().build();
    }
    public MateriaResponse asignarDatosRespuesta(Materia materia){
        return (new MateriaResponse(materia.getNombre(),materia.getCodigo(),materia.getCreditos()));
    }

}
