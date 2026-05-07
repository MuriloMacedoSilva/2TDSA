package com.fiap.sistemabiblioteca.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fiap.sistemabiblioteca.DTO.LivroRequestDTO;
import com.fiap.sistemabiblioteca.DTO.LivroResponseDTO;
import com.fiap.sistemabiblioteca.service.LivroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

	
	private final LivroService livroService;
	
	@Autowired
	public LivroController (LivroService livroService) {
		this.livroService = livroService;
	}
	
	@GetMapping
	public ResponseEntity<List<LivroResponseDTO>> listarTodos(){
		List<LivroResponseDTO> livros = livroService.listarTodos();
		return ResponseEntity.ok(livros);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<LivroResponseDTO> buscarPorId(@PathVariable Long id){
		
		Optional<LivroResponseDTO> livroOpt = livroService.buscarPorId(id);
		
		if(livroOpt.isPresent()) {
			return ResponseEntity.ok(livroOpt.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@PostMapping
	public ResponseEntity<LivroResponseDTO> criar(
			@Valid @RequestBody LivroRequestDTO requestDTO
			) {
		LivroResponseDTO livroCriado = livroService.criar(requestDTO);
		return ResponseEntity
				.status(HttpStatus.CREATED)
				.body(livroCriado);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<LivroResponseDTO> atualizar (
			@PathVariable Long id,
			@Valid @RequestBody LivroRequestDTO requestDTO
			){
		Optional<LivroResponseDTO> livroAtualizado = livroService.atualizar(id, requestDTO);
		
		if(livroAtualizado.isPresent()) {
			return ResponseEntity.ok(livroAtualizado.get());
		}
		return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		
		boolean deletado = livroService.deletar(id);
		
		if(deletado) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}
	
	@GetMapping("/disponiveis")
	public ResponseEntity<List<LivroResponseDTO>> listarDisponiveis(){
		List<LivroResponseDTO> livros = livroService.listarDisponiveis();
		return ResponseEntity.ok(livros);
	}
	
	@GetMapping("/busca")
	public ResponseEntity<List<LivroResponseDTO>> buscarPorTitulo(
		@RequestParam(required = false) String titulo){
		
		if(titulo == null || titulo.trim().isEmpty()) {
			return ResponseEntity.ok(livroService.listarTodos());
		}
		
		List<LivroResponseDTO> livros = livroService.buscarPorTitulo(titulo);
		return ResponseEntity.ok(livros);
	}
}
