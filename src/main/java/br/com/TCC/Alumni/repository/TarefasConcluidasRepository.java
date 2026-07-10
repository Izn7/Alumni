package br.com.TCC.Alumni.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.TCC.Alumni.entity.TarefasConcluidasEntity;

public interface TarefasConcluidasRepository extends JpaRepository<TarefasConcluidasEntity, Integer>{

	boolean existsByEstagiarioIdAndTarefasEntityId(
	        Integer idEstagiario,
	        Integer idTarefa
	);
	
}