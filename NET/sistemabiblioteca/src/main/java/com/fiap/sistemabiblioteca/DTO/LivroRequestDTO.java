package com.fiap.sistemabiblioteca.DTO;

import jakarta.validation.constraints.*; 
import org.hibernate.validator.constraints.ISBN;
public record LivroRequestDTO(

			@NotBlank(message = "Título é obrigatório")    
			@Size(min = 3, max = 200)  
		    String titulo,  
		    
		    @NotBlank(message = "Autor é obrigatório")  
		    String autor,  
		    
		    @Min(value = 1500, message = "Ano mínimo 1500")  
		    @Max(value = 2025, message = "Ano máximo 2025")  
		    Integer anoPublicacao,  
		    
		    @ISBN(message = "ISBN inválido")  
		    String isbn      
		) {}



