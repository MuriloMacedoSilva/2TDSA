package com.FirstApiChallenge.api.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

public record TutorRequestDTO(
        @NotBlank(message = "nome obrigatório")
        String name,

        @NotBlank(message = "email é obrigatório")
        String email,

        @NotBlank(message = "cpf é obrigatório")
        String cpf,

        @NotNull(message = "numero de telefone é obrigatório")
        @Positive(message = "o numero de telefone tem que ser maior que zero")
        Integer phoneNumber,

        @NotBlank(message = "Senha é obrigatória")
        @Size(min = 8, max = 11, message = "O campo deve ter entre 8 e 11 caracteres")
        String senha

) {}
