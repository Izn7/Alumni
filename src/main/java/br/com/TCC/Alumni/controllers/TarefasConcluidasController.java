package br.com.TCC.Alumni.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TCC.Alumni.entity.TarefasConcluidasEntity;
import br.com.TCC.Alumni.repository.TarefasConcluidasRepository;

@RestController
@RequestMapping("/TarefasConcluidas")
public class TarefasConcluidasController {

	@Autowired
	private TarefasConcluidasRepository tarefasConcluidasRepository;
	
	@GetMapping("/BuscarTodos")
	@ResponseStatus(HttpStatus.OK)
	public List<TarefasConcluidasEntity> buscarTodasTarefasConcluidas(){
		return tarefasConcluidasRepository.findAll();
		
	}
	@GetMapping("/BuscarPorId/{id}")
	@ResponseStatus(HttpStatus.OK)
	public Optional<TarefasConcluidasEntity> buscarTarefasUsuarioPorId(@PathVariable Integer id){
		return tarefasConcluidasRepository.findById(id);
	}
}
