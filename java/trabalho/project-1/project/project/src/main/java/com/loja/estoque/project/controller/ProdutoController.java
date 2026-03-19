package com.loja.estoque.project.controller;

import com.loja.estoque.project.dto.ProdutoRequestDTO;
import com.loja.estoque.project.dto.ProdutoResponseDTO;
import com.loja.estoque.project.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/produtos")
public class ProdutoController {


    private final ProdutoService produtoService;

    @Autowired
    public ProdutoController (ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    @GetMapping
    public ResponseEntity<List<ProdutoResponseDTO>> listarTodos(){
        List<ProdutoResponseDTO> produtos = produtoService.listarTodos();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> buscarPorId(@PathVariable Long id){

        Optional<ProdutoResponseDTO> produtoOpt = produtoService.buscarPorId(id);

        if(produtoOpt.isPresent()) {
            return ResponseEntity.ok(produtoOpt.get());
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping
    public ResponseEntity<ProdutoResponseDTO> criar(
            @Valid @RequestBody ProdutoRequestDTO requestDTO
    ) {
        ProdutoResponseDTO produtoCriado = produtoService.criar(requestDTO);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(produtoCriado);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProdutoResponseDTO> atualizar (
            @PathVariable Long id,
            @Valid @RequestBody ProdutoRequestDTO requestDTO
    ){
        Optional<ProdutoResponseDTO> produtoAtualizado = produtoService.atualizar(id, requestDTO);

        if(produtoAtualizado.isPresent()) {
            return ResponseEntity.ok(produtoAtualizado.get());
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){

        boolean deletado = produtoService.deletar(id);

        if(deletado) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/disponiveis")
    public ResponseEntity<List<ProdutoResponseDTO>> listarDisponiveis(){
        List<ProdutoResponseDTO> produtos = produtoService.listarDisponiveis();
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/busca")
    public ResponseEntity<List<ProdutoResponseDTO>> buscarPorTitulo(
            @RequestParam(required = false) String nome){

        if(nome == null || nome.trim().isEmpty()) {
            return ResponseEntity.ok(produtoService.listarTodos());
        }

        List<ProdutoResponseDTO> produtos = produtoService.buscarPorNome(nome);
        return ResponseEntity.ok(produtos);
    }
}
