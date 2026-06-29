package br.com.TCC.Alumni.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.TCC.Alumni.entity.EmpresaEntity;

@Repository
public interface EmpresaRepository extends JpaRepository<EmpresaEntity, Integer>{

	Optional <EmpresaEntity> findByCnpj(String cnpj);
	
	List<EmpresaEntity> findByNomeEmpresa(String nomeEmpresa);
	
	Optional <EmpresaEntity> findByEmail(String email);
	
}
