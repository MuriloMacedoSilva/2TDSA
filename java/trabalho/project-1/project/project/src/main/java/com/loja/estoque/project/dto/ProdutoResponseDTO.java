package com.loja.estoque.project.dto;

import com.loja.estoque.project.model.Produto;

import java.math.BigDecimal;

public record ProdutoResponseDTO(
        
        Long id,
        String nome,
        String descricao,
        BigDecimal preco,
        Integer quantidade,
        Boolean disponivel
) {
    public static ProdutoResponseDTO fromEntity (Produto produto) {
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getQuantidade(),
                produto.getDisponivel());
    }
}
