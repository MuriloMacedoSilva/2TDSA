package com.fiap.sistemabiblioteca.service;



import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.fiap.sistemabiblioteca.DTO.LivroRequestDTO;
import com.fiap.sistemabiblioteca.DTO.LivroResponseDTO;
import com.fiap.sistemabiblioteca.model.Livro;
import com.fiap.sistemabiblioteca.repository.LivroRepository;



@Service
public class LivroService {

	private final LivroRepository livroRepository;
	
	@Autowired
	public LivroService(LivroRepository livroRepository) {
		this.livroRepository = livroRepository;
	}
	
	@Transactional(readOnly = true)
	public List<LivroResponseDTO> listarTodos(){
		
		List<Livro> livros = livroRepository.findAll();
		
		return livros.stream()
				.map(LivroResponseDTO :: fromEntity)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly= true)
	public Optional<LivroResponseDTO> buscarPorId(Long id){
		
		Optional<Livro> livroOpt = livroRepository.findById(id);
		
		return livroOpt.map(LivroResponseDTO :: fromEntity);
	}
	
	public LivroResponseDTO criar (LivroRequestDTO requestDTO) {
		
		Livro livro = new Livro();
		livro.setTitulo(requestDTO.titulo());
		livro.setAutor(requestDTO.autor());
		livro.setAnoPublicacao(requestDTO.anoPublicacao());
		livro.setIsbn(requestDTO.isbn());
		livro.setDisponivel(true);
		
		Livro livroSalvo = livroRepository.save(livro);
		
		return LivroResponseDTO.fromEntity(livroSalvo);
	}
	@Transactional
	public Optional<LivroResponseDTO> atualizar(Long id, LivroRequestDTO requestDTO){
		
		Optional<Livro> livroOpt = livroRepository.findById(id);
		
		if(livroOpt.isPresent()) {
			Livro livro = livroOpt.get();
			
			livro.setTitulo(requestDTO.titulo());
			livro.setAutor(requestDTO.autor());
			livro.setAnoPublicacao(requestDTO.anoPublicacao());
			livro.setIsbn(requestDTO.isbn());
			
			Livro livroAtualizado = livroRepository.save(livro);
			
			return Optional.of(LivroResponseDTO.fromEntity(livroAtualizado));
		}
		return Optional.empty();
	}
	
	@Transactional
	public boolean deletar(Long id) {
		
		if(livroRepository.existsById(id)) {
			livroRepository.deleteById(id);
			return true;
		}
		return false;
	}
	
	@Transactional(readOnly = true)
	public List<LivroResponseDTO> listarDisponiveis(){
		List<Livro> livros = livroRepository.findByDisponivel(true);
		
		return livros.stream()
				.map(LivroResponseDTO :: fromEntity)
				.collect(Collectors.toList());
	}
	
	@Transactional(readOnly = true)
	public List<LivroResponseDTO> buscarPorTitulo(String titulo){
		List<Livro> livros = livroRepository.findByTituloContainingIgnoreCase(titulo);
		
		return livros.stream()
				.map(LivroResponseDTO :: fromEntity)
				.collect(Collectors.toList());
	}
}
