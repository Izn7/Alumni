package br.com.TCC.Alumni.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.TCC.Alumni.entity.TarefasUsuarioEntity;

@Repository
public interface TarefasUsuarioRepository extends JpaRepository<TarefasUsuarioEntity, Integer> {

}
