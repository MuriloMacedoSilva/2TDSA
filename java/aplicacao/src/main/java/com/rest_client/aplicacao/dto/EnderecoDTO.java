package com.rest_client.aplicacao.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EnderecoDTO {
    /*
    DTO para representar a resposta da API ViaCEP
    O viaCEP retorna um JSON com estes campos.

    Lombok:
    -@Data: Gera getter, setters, toString, equals, hashCode
    -@NoArgsConstructor: Gera construtor sem argumentos
    -@AllArgsConstructor: Gera construtor com todos os argumentos
     */
    private String cep;
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade;
    private String uf;
    private String ibge;
    private String gia;
    private String ddd;
    private String siafi;
}
