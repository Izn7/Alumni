package br.com.TCC.Alumni.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TCC.Alumni.entity.EmpresaEntity;
import br.com.TCC.Alumni.repository.EmpresaRepository;

@RestController
@RequestMapping("/Empresas")
public class EmpresaControllers {

	@Autowired
	private EmpresaRepository empresaRepository;

	
	@PostMapping("/Gravar")
	@ResponseStatus(HttpStatus.CREATED)
	public EmpresaEntity gravarEmpresa(@RequestBody EmpresaEntity empresaEntity) {
	return empresaRepository.save(empresaEntity);
	}
	
	@GetMapping("/BuscarPorId/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<EmpresaEntity> buscarEmpresaPorId(@PathVariable Integer id){
		return empresaRepository.findById(id);
		
	}
	
	@GetMapping("/buscarPorCnpj/{cnpj}")
	@ResponseStatus(HttpStatus.OK)
	private List<EmpresaEntity> buscarPorCnpj(@PathVariable String cnpj){
		return empresaRepository.findByCnpj(cnpj);
	}
}
