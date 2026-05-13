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

import br.com.TCC.Alumni.entity.TarefasUsuarioEntity;
import br.com.TCC.Alumni.repository.TarefasUsuarioRepository;


@RestController
@RequestMapping("/TarefasUsuario")
public class TarefasUsuarioControllers {

	
	
		
	
						@Autowired
						private TarefasUsuarioRepository tarefasUsuarioRepository;
						
						@GetMapping("/BuscarTodos")
						@ResponseStatus(HttpStatus.OK)
						public List<TarefasUsuarioEntity> buscarTodasTarefasUsuario(){
							return tarefasUsuarioRepository.findAll();
							
						}
						@GetMapping("/BuscarPorId/{id}")
						@ResponseStatus(HttpStatus.OK)
						public Optional<TarefasUsuarioEntity> buscarTarefasUsuarioPorId(@PathVariable Integer id){
							return tarefasUsuarioRepository.findById(id);
							
						}
						
						@PostMapping("/Gravar")
						@ResponseStatus(HttpStatus.CREATED)
						public TarefasUsuarioEntity gravarTarefasUsuario(@RequestBody TarefasUsuarioEntity tarefasUsuario) {
							return tarefasUsuarioRepository.save(tarefasUsuario);
							
						}
						
						@PutMapping("/Atualizar/{id}")
						@ResponseStatus(HttpStatus.OK)
						public TarefasUsuarioEntity atualizarTarefasUsuario(@RequestBody TarefasUsuarioEntity tarefasUsuario, @PathVariable int id) {
							
							if(tarefasUsuarioRepository.existsById(id)) {
								
								return tarefasUsuarioRepository.save(tarefasUsuario);
							}
							
							return null;
							
							
						}
						@DeleteMapping("/Deletar/{id}")
						@ResponseStatus(HttpStatus.OK)
						public String deletarTarefasUsuario (@PathVariable Integer id) {
							
							if (tarefasUsuarioRepository.existsById(id)) {
								tarefasUsuarioRepository.deleteById(id);
									return "Usuario deletado com sucesso!";
							}
							return "Usuario não encontrado!";
							
							}
						
					
				
			}

	
	

