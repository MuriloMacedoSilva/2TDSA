package com.FirstApiChallenge.dto;

import com.FirstApiChallenge.model.Tutor;

public record TutorResponseDTO(
        Long id,
        String name,
        String email,
        String cpf,
        Integer phoneNumber,
        String senha
) {
    public static TutorResponseDTO fromEntity (Tutor tutor) {
        return new TutorResponseDTO(
                tutor.getId(),
                tutor.getName(),
                tutor.getEmail(),
                tutor.getCpf(),
                tutor.getPhoneNumber(),
                tutor.getSenha());
    }
}
