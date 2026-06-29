package br.com.TCC.Alumni.controllers;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	private BCryptPasswordEncoder encoder;
	
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
	private Optional<EmpresaEntity> buscarPorCnpj(@PathVariable String cnpj){
		return empresaRepository.findByCnpj(cnpj);
	}
	
	@GetMapping("/buscarPorCnpj/{nomeEmpresa}")
	@ResponseStatus(HttpStatus.OK)
	private List<EmpresaEntity> buscarPorNome(@PathVariable String nomeEmpresa){
		return empresaRepository.findByNomeEmpresa(nomeEmpresa);
	}

	@PostMapping("/login")
	public ResponseEntity<EmpresaEntity> login(
	        @RequestBody EmpresaEntity empresaLogin) {

	    // busca usuário por email
	    Optional<EmpresaEntity> empresa =
	    		empresaRepository.findByEmail(empresaLogin.getEmail());

	    // se encontrou usuário, verifica senha
	    if (empresa.isPresent()) {

	    	EmpresaEntity empresaEncontrada = empresa.get();

	        // compara senha enviada com senha armazenada (hash)
	        if (encoder.matches(
	        		empresaLogin.getSenha(),
	        		empresaEncontrada.getSenha())) {

	            return ResponseEntity.ok(empresaEncontrada);
	        }
	    }

	    // se não encontrou usuário ou senha não bate, retorna 401
	    return ResponseEntity.status(401).build();
	}



}
