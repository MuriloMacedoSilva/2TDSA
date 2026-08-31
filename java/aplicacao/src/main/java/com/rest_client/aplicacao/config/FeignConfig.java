package com.rest_client.aplicacao.config;

import feign.RequestInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.Logger;

@Configuration
public class FeignConfig {
    /*
    Configurar o nível de log do Feign
    Níveis de log:
    NONE: Sem logs (padrão)
    BASIC: Apenas método, URL e status
    HEADERS: BASIC + cabeçalho
    FULL: HEADERS + corpo da requisição e resposta
     */
    @Bean
    public Logger.Level feignLoggerLevel(){
        return feign.Logger.Level.FULL;
    }
    /*
    Interceptador para adicionar cabeçalhos como padrão em todas as requisições
    Útil para adicionar tokens de autenticação, headers personalizados, etc...
     */

    @Bean
    public RequestInterceptor requestInterceptor(){
        return requestTemplate -> {
            //Adiciona um header personalizado em todas as requisições
                requestTemplate.header("User-agent","SpringBoot-Feign-Client");
                //Se precisar de autenticação:
                //requestTemplate.header("Authorization","Bearer"+token);
        };
    }
}
