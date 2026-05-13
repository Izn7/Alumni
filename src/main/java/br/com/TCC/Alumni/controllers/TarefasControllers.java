package br.com.TCC.Alumni.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TCC.Alumni.entity.TarefasEntity;
import br.com.TCC.Alumni.repository.TarefasRepository;



@RestController
@RequestMapping("/Tarefas")
public class TarefasControllers {

	
		
		

						@Autowired
						private TarefasRepository tarefasRepository;
						
						@GetMapping("/BuscarTodos")
						@ResponseStatus(HttpStatus.OK)
						public List<TarefasEntity> buscarTodasTarefas(){
							return tarefasRepository.findAll();
							
						}
						@GetMapping("/BuscarPorId/{id}")
						@ResponseStatus(HttpStatus.OK)
						public Optional<TarefasEntity> buscarTarefasPorId(@PathVariable Integer id){
							return tarefasRepository.findById(id);
							
						}
						@PostMapping("/Gravar")
						@ResponseStatus(HttpStatus.CREATED)
						public TarefasEntity gravarTarefas(@RequestBody TarefasEntity tarefas) {
							return tarefasRepository.save(tarefas);
							
						}
						
						@PutMapping("/Atualizar/{id}")
						@ResponseStatus(HttpStatus.OK)
						public TarefasEntity atualizarTarefas(@RequestBody TarefasEntity tarefas, @PathVariable int id) {
							if(tarefasRepository.existsById(id)) {
								
								return tarefasRepository.save(tarefas);
							}
							
								return null;
						}
						@DeleteMapping("/Deletar/{id}")
						@ResponseStatus(HttpStatus.OK)
						public String deletarTarefas (@PathVariable Integer id) {
							
							if (tarefasRepository.existsById(id)) {
								tarefasRepository.deleteById(id);
									return "Usuario deletado com sucesso!";
							}
							return "Usuario não encontrado!";
							
							}
						
					
				
			}
	
	

