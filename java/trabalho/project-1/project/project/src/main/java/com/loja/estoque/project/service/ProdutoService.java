package com.loja.estoque.project.service;

import com.loja.estoque.project.dto.ProdutoRequestDTO;
import com.loja.estoque.project.dto.ProdutoResponseDTO;
import com.loja.estoque.project.model.Produto;
import com.loja.estoque.project.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;

    @Autowired
    public ProdutoService(ProdutoRepository produtoRepository) {
        this.produtoRepository = produtoRepository;
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarTodos(){

        List<Produto> produtos = produtoRepository.findAll();

        return produtos.stream()
                .map(ProdutoResponseDTO :: fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly= true)
    public Optional<ProdutoResponseDTO> buscarPorId(Long id){

        Optional<Produto> produtoOpt = produtoRepository.findById(id);

        return produtoOpt.map(ProdutoResponseDTO :: fromEntity);
    }

    public ProdutoResponseDTO criar (ProdutoRequestDTO requestDTO) {

        Produto produto = new Produto();
        produto.setNome(requestDTO.nome());
        produto.setDescricao(requestDTO.descricao());
        produto.setPreco(requestDTO.preco());
        produto.setQuantidade(requestDTO.quantidade());
        produto.setDisponivel(true);

        Produto produtoSalvo = produtoRepository.save(produto);

        return ProdutoResponseDTO.fromEntity(produtoSalvo);
    }
    @Transactional
    public Optional<ProdutoResponseDTO> atualizar(Long id, ProdutoRequestDTO requestDTO){

        Optional<Produto> produtoOpt = produtoRepository.findById(id);

        if(produtoOpt.isPresent()) {
            Produto produto = produtoOpt.get();

            produto.setNome(requestDTO.nome());
            produto.setDescricao(requestDTO.descricao());
            produto.setPreco(requestDTO.preco());
            produto.setQuantidade(requestDTO.quantidade());

            Produto produtoAtualizado = produtoRepository.save(produto);

            return Optional.of(ProdutoResponseDTO.fromEntity(produtoAtualizado));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean deletar(Long id) {

        if(produtoRepository.existsById(id)) {
            produtoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> listarDisponiveis(){
        List<Produto> livros = produtoRepository.findByDisponivel(true);

        return livros.stream()
                .map(ProdutoResponseDTO :: fromEntity)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProdutoResponseDTO> buscarPorNome(String nome){
        List<Produto> produtos = produtoRepository.findByNomeContainingIgnoreCase(nome);

        return produtos.stream()
                .map(ProdutoResponseDTO :: fromEntity)
                .collect(Collectors.toList());
    }
}
