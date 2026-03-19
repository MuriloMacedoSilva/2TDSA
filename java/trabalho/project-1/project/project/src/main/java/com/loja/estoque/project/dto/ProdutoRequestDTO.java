package com.loja.estoque.project.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;

public record ProdutoRequestDTO(

        @NotBlank(message = "Titulo obrigatório")
        @Size(min = 3, max = 150)
        String nome,

        @NotBlank(message = "Descrcao é obrigatório")
        String descricao,

        @NotNull(message = "a quantidade é obrigatória")
        Integer quantidade,

        // Correto:
        @NotNull(message = "O preço é obrigatório")
        @Positive(message = "O preço deve ser maior que zero")
        BigDecimal preco
) {}
