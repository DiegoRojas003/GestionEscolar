package com.diegorojas.gestion_escolar_backend.domain.nota;

import com.diegorojas.gestion_escolar_backend.domain.alumno.Alumno;
import com.diegorojas.gestion_escolar_backend.domain.alumno.AlumnoRepository;
import com.diegorojas.gestion_escolar_backend.domain.materia.Materia;
import com.diegorojas.gestion_escolar_backend.domain.materia.MateriaRepository;
import com.diegorojas.gestion_escolar_backend.infra.errores.ValidacionDeIntegridad;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotaService {
    @Autowired
    AlumnoRepository alumnoRepository;
    @Autowired
    MateriaRepository materiaRepository;
    @Autowired
    NotaRepository notaRepository;

    public ResponseEntity<Nota> saveNotaService(DatosNota datosNota){
        if(!alumnoRepository.findById(datosNota.alumno_id()).isPresent()){
            throw new ValidacionDeIntegridad("El id del alumno no fue encontrado");
        }
        if(!materiaRepository.findById(datosNota.materia_id()).isPresent()){
            throw new ValidacionDeIntegridad("El id de la materia no fue encontrado");
        }
        Alumno alumno = alumnoRepository.getReferenceById(datosNota.alumno_id());
        Materia materia = materiaRepository.getReferenceById(datosNota.materia_id());
        Nota nota = notaRepository.save(new Nota(datosNota,alumno,materia));
        return ResponseEntity.ok(nota);
    }
}
