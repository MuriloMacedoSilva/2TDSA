package com.FirstApiChallenge.FirstApiChallenge.repository;

import com.FirstApiChallenge.FirstApiChallenge.model.Tutor;
import com.FirstApiChallenge.FirstApiChallenge.model.Veterinario;
import org.springframework.data.jpa.repository.JpaRepository; // Importação importante
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface TutorRepository extends JpaRepository<Tutor, Long> {

    // O Spring cria o SQL automaticamente só pelo nome do método!
    Optional<Tutor> findByCpfTutor(String cpf);

    Optional<Veterinario> findByCpfVeterinario(String cpf);
}