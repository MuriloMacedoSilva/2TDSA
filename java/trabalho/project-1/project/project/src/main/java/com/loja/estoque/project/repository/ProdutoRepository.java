package com.loja.estoque.project.repository;

import com.loja.estoque.project.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByDisponivel(Boolean disponivel);

    // Busca por parte do nome (ignora maiúsculas/minúsculas)
    List<Produto> findByNomeContainingIgnoreCase(String nome);

    // Essencial para evitar cadastrar dois produtos com o mesmo nome
    boolean existsByNomeIgnoreCase(String nome);
}
