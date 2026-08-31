package com.rest_client.aplicacao;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients //Ativa o cliente Feign na aplicação
public class AplicacaoApplication {

	public static void main(String[] args) {
		SpringApplication.run(AplicacaoApplication.class, args);
		System.out.println("Aplicação iniciada com sucesso");
		System.out.println("Acesse: http://localhost:8080/endereco/01001000");
	}

}
