package com.fiap.sistemabiblioteca.DTO;

import com.fiap.sistemabiblioteca.model.Livro;

public record LivroResponseDTO(

	Long id,
	String titulo,
	String autor,
	Integer anoPublicacao,
	String isbn,
	Boolean disponivel
) {
	
	public static LivroResponseDTO fromEntity (Livro livro) {
		return new LivroResponseDTO (
				livro.getId(),
				livro.getTitulo(),
				livro.getAutor(),
				livro.getAnoPublicacao(),
				livro.getIsbn(),
				livro.getDisponivel());
	}
}
