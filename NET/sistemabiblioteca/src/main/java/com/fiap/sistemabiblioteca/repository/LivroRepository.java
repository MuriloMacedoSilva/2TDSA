package com.fiap.sistemabiblioteca.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.fiap.sistemabiblioteca.model.Livro;


@Repository
public interface LivroRepository extends JpaRepository<Livro,Long>{

	List<Livro> findByDisponivel(Boolean disponivel);
	
	List<Livro> findByTituloContainingIgnoreCase(String titulo); //Like %texto%
	
	List<Livro> findByAutorAndDisponivel(String autor, Boolean disponivel);
}
