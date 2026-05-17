package com.FirstApiChallenge.api.dto;

import com.FirstApiChallenge.api.model.Animal;
import com.FirstApiChallenge.api.model.Tutor;
import com.FirstApiChallenge.api.model.Veterinarian;

import java.util.Optional;

public record TutorResponseDTO(
        Long id,
        String name,
        String email,
        String cpf,
        String phoneNumber,
        String password,
        String role,
        Optional<Animal> animals,
        Optional<Veterinarian> veterinarians
) {
    public static TutorResponseDTO fromEntity (Tutor tutor) {
        return new TutorResponseDTO(
                tutor.getId(),
                tutor.getName(),
                tutor.getEmail(),
                tutor.getCpf(),
                tutor.getPhoneNumber(),
                tutor.getPassword(),
                tutor.getRole(),
                tutor.getAnimals(),
                tutor.getVeterinarians());
    }
}
