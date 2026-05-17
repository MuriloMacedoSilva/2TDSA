package com.FirstApiChallenge.api.service;

import com.FirstApiChallenge.api.dto.TutorRequestDTO;
import com.FirstApiChallenge.api.dto.TutorResponseDTO;
import com.FirstApiChallenge.api.model.Tutor;
import com.FirstApiChallenge.api.repository.TutorRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class TutorService {

    private final TutorRepository tutorRepository;

    public TutorService(TutorRepository tutorRepository) {
        this.tutorRepository = tutorRepository;
    }


    @Transactional(readOnly = true)
    public Optional<TutorResponseDTO> buscarTutorPorCpf(String cpf) {
        return tutorRepository.findByCpf(cpf)
                .map(TutorResponseDTO::fromEntity);
    }

    @Transactional
    public TutorResponseDTO authenticateTutor(TutorRequestDTO requestDTO) {
        Tutor tutor = tutorRepository.findByCpf(requestDTO.cpf())
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));

        if (!tutor.getPassword().equals(requestDTO.password())){
            throw new RuntimeException("senha incorreta");
        }

        return TutorResponseDTO.fromEntity(tutor);
    }

    @Transactional
    public TutorResponseDTO createTutor(TutorRequestDTO requestDTO) {

        if (tutorRepository.findByCpf(requestDTO.cpf()).isPresent()) {
           throw new RuntimeException("CPF já cadastrado");
        }


        Tutor tutor = new Tutor();
        tutor.setName(requestDTO.name());
        tutor.setEmail(requestDTO.email());
        tutor.setCpf(requestDTO.cpf());
        tutor.setPhoneNumber(requestDTO.phoneNumber());
        tutor.setPassword(requestDTO.password());
        tutor.setRole(requestDTO.role());


        Tutor tutorSaved = tutorRepository.save(tutor);

        return TutorResponseDTO.fromEntity(tutorSaved);
    }

    @Transactional
    public Optional<TutorResponseDTO> updateTutorByCpf(String cpf, TutorRequestDTO requestDTO) {
        return tutorRepository.findByCpf(cpf).map(tutorExistente -> {
            tutorExistente.setName(requestDTO.name());
            tutorExistente.setEmail(requestDTO.email());
            tutorExistente.setPhoneNumber(requestDTO.phoneNumber());
            tutorExistente.setPassword(requestDTO.password());
            tutorExistente.setRole(requestDTO.role());
            tutorExistente.setAnimals(requestDTO.animals());
            tutorExistente.setVeterinarians(requestDTO.veterinarians());

            Tutor tutorUpdated = tutorRepository.save(tutorExistente);

            return TutorResponseDTO.fromEntity(tutorUpdated);
        }
        );
    }
}
