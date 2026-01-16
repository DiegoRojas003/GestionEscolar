package com.diegorojas.gestion_escolar_backend.controller;

import com.diegorojas.gestion_escolar_backend.domain.nota.DatosNota;
import com.diegorojas.gestion_escolar_backend.domain.nota.Nota;
import com.diegorojas.gestion_escolar_backend.domain.nota.NotaRepository;
import com.diegorojas.gestion_escolar_backend.domain.nota.NotaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.w3c.dom.stylesheets.LinkStyle;

import java.util.List;

@RestController
@RequestMapping("/nota")
@CrossOrigin(origins = "http://localhost:5173")
public class NotaController {

    @Autowired
    NotaRepository notaRepository;
    @Autowired
    NotaService notaService;

    @PostMapping
    public ResponseEntity<Nota> saveNota(@RequestBody @Valid DatosNota datosNota){
        var response = notaService.saveNotaService(datosNota);
        return response;
    }

    @GetMapping("/{id}")
    public List<Nota> getNotasByAlumno(@PathVariable Long id){
        return notaRepository.findByAlumnoId(id);
    }
}
