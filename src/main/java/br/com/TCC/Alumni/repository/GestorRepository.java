package br.com.TCC.Alumni.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import br.com.TCC.Alumni.entity.GestorEntity;

@Repository
public interface GestorRepository extends JpaRepository<GestorEntity, Integer> {

	 Optional <GestorEntity> findByEmail(String email);
	
}
