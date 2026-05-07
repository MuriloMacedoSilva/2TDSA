package com.FirstApiChallenge.service;

import com.FirstApiChallenge.dto.TutorRequestDTO;
import com.FirstApiChallenge.dto.TutorResponseDTO;
import com.FirstApiChallenge.model.Tutor;
import com.FirstApiChallenge.repository.TutorRepository;
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
        return tutorRepository.findByCpfTutor(cpf)
                .map(TutorResponseDTO::fromEntity);
    }

    @Transactional
    public TutorResponseDTO criarTutor(TutorRequestDTO requestDTO) {


        Tutor tutor = new Tutor();
        tutor.setName(requestDTO.name());
        tutor.setEmail(requestDTO.email());
        tutor.setCpf(requestDTO.cpf());
        tutor.setPhoneNumber(requestDTO.phoneNumber());
        tutor.setSenha(requestDTO.senha());

        Tutor tutorSalvo = tutorRepository.save(tutor);

        return TutorResponseDTO.fromEntity(tutorSalvo);
    }

    @Transactional
    public Optional<TutorResponseDTO> atualizarTutorPorCpf(String cpf, TutorRequestDTO requestDTO) {
        return tutorRepository.findByCpfTutor(cpf).map(tutorExistente -> {
            tutorExistente.setName(requestDTO.name());
            tutorExistente.setEmail(requestDTO.email());
            tutorExistente.setPhoneNumber(requestDTO.phoneNumber());
            tutorExistente.setSenha(requestDTO.senha());

            Tutor tutorAtualizado = tutorRepository.save(tutorExistente);

            return TutorResponseDTO.fromEntity(tutorAtualizado);
        }
        );
    }
}
