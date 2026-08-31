package com.rest_client.aplicacao.service;
/*
Service responsável pela logica de negócio relacionada a endereços.
Essa camada usa o cliente Feign para buscar os dados
 */

import com.rest_client.aplicacao.client.ViaCepClient;
import com.rest_client.aplicacao.dto.EnderecoDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EnderecoService {

    //Injeção de dependência do cliente Feign
    @Autowired
    private ViaCepClient viaCepClient;

    /*
    Busca um endereço pelo CEP usando o cliente Feign
     */
    public EnderecoDTO buscarEnderecoPorCep(String cep){
        //Remove caracteres não numéricos do cep
        String cepLimpo = cep.replaceAll("\\D","");
        //Valida se o CEP tem 8 dígitos
        if (cepLimpo.length() !=8){
            throw new RuntimeException("CEP inválido!!! Deve conter 8 dígitos...");
        }
        try{
            //Faz a chamada para a API ViaCEP usando o Feign
            EnderecoDTO endereco = viaCepClient.buscarEnderecoPorCep(cepLimpo);

            //Verifica se o CEP foi encontrado (ViaCep retorna um JSON com erro)
            if (endereco == null || endereco.getLocalidade()==null){
                throw  new RuntimeException("CEP não encontrado!!!");
            }
            return endereco;
        }catch (Exception e){
            //Trata qualquer erro na comunicação com a API
            throw new RuntimeException("Erro ao compilar o CEP: "+ e.getMessage(), e);
        }
    }
    public String formatarEndereco(EnderecoDTO endereco){
        return String.format(
                "%s, %s - %s %s - CEP: %s",
                endereco.getLogradouro() != null ? enedreco.getLogradourp() : "Sem logradourp",
        )
    }
}
