package com.FirstApiChallenge.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Veterinarios")
@Getter
@Setter
public class Veterinario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 200)
    private String name;

    @Column(nullable = false, length = 400)
    private String email;

    @Column(nullable = false, length = 11)
    private String cpf;

    @Column(nullable = false, length = 11)
    private Integer phoneNumber;

    @Column(nullable = false)
    @Size(min = 8, max = 11, message = "O campo deve ter entre 8 e 11 caracteres")
    private String senha;

    @Size(min = 3, max = 6, message = "O número do CRMV deve ter entre 3 e 6 dígitos")
    @Column(length = 6)
    private String crmvNumero;

    @Size(min = 2, max = 2)
    private String crmvEstado; // Ex: "SP"

    @Column(nullable = false, length = 14)
    private String cnpj;

}
