package br.com.TCC.Alumni.repository;




import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.TCC.Alumni.entity.EstagiariosEntity;


@Repository
public interface EstagiariosRepository extends JpaRepository<EstagiariosEntity, Integer> {

	Optional <EstagiariosEntity> findByEmail(String email);


	
	
}
