package com.loja.estoque.project;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EstoqueApplication {

	public static void main(String[] args) {
		SpringApplication.run(EstoqueApplication.class, args);

		System.out.println("\nSistema Estoque Rodando...");
		System.out.println("\nAPI Disponível em http://localhost:8080/api/produtos");
		System.out.println("\nConsole H2: http://localhost:8080/h2-console");
	}

}
