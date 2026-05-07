package com.fiap.sistemabiblioteca;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SistemabibliotecaApplication {

	public static void main(String[] args) {
		SpringApplication.run(SistemabibliotecaApplication.class, args);
		
		System.out.println("\nSistema Biblioteca Rodando...");
		System.out.println("\nAPI Disponível em http://localhost:8080/api/livros");
		System.out.println("\nConsole H2: http://localhost:8080/h2-console");
	}

}
