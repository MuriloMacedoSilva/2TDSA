package com.FirstApiChallenge.controler;


import com.FirstApiChallenge.dto.TutorRequestDTO;
import com.FirstApiChallenge.dto.TutorResponseDTO;
import com.FirstApiChallenge.service.TutorService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tutores")
public class TutorController {

    private final TutorService tutorService;

    public TutorController(TutorService tutorService) {
        this.tutorService = tutorService;
    }

    @PostMapping
    public ResponseEntity<TutorResponseDTO> criar(@RequestBody @Valid TutorRequestDTO dto){
        TutorResponseDTO response = tutorService.criarTutor(dto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{cpf}")
    public ResponseEntity<TutorResponseDTO> buscarTutorPorCpf(@PathVariable String cpf){
        return tutorService.buscarTutorPorCpf(cpf)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

