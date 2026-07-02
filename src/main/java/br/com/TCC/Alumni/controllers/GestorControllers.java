package br.com.TCC.Alumni.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TCC.Alumni.entity.GestorEntity;
import br.com.TCC.Alumni.repository.GestorRepository;


@RestController
@RequestMapping("/Gestores")
public class GestorControllers {
	
	

					@Autowired
					private GestorRepository gestorrepository;
					
					@Autowired
					private BCryptPasswordEncoder encoder;
					
					@GetMapping("/BuscarTodos")
					@ResponseStatus(HttpStatus.OK)
					public List<GestorEntity> buscarTodosGestores(){
						return gestorrepository.findAll();
						
					}
					@GetMapping("/BuscarPorId/{id}")
					@ResponseStatus(HttpStatus.OK)
					public Optional<GestorEntity> buscarGestoresPorId(@PathVariable Integer id){
						return gestorrepository.findById(id);
						
					}
					@PostMapping("/Gravar")
					@ResponseStatus(HttpStatus.CREATED)
					public GestorEntity gravarGestores(@RequestBody GestorEntity gestor) {
						gestor.setFirstLogin(true);
						gestor.setSenha(encoder.encode(gestor.getSenha()));
						return gestorrepository.save(gestor);
						
					}
					
					@PutMapping("/Atualizar/{id}")
					@ResponseStatus(HttpStatus.OK)
					public GestorEntity atualizarGestores(@PathVariable Integer id, @RequestBody GestorEntity gestor) {
						 GestorEntity gestor1 = gestorrepository.findById(id).orElseThrow(() -> new RuntimeException("Gestor não encontrado"));
						gestor1.setFirstLogin(false);
						gestor1.setSenha(encoder.encode(gestor.getSenha()));
						return gestorrepository.save(gestor1);
						
					}
					@DeleteMapping("/Deletar/{id}")
					@ResponseStatus(HttpStatus.OK)
					public String deletarGestores (@PathVariable Integer id) {
						
						if (gestorrepository.existsById(id)) {
							gestorrepository.deleteById(id);
								return "Usuario deletado com sucesso!";
						}
						return "Usuario não encontrado!";
						
						}
					
					@PostMapping("/login")
					public ResponseEntity<GestorEntity> login(
					        @RequestBody GestorEntity gestorlogin) {

					    // busca usuário por email
					    Optional<GestorEntity> gestor =
					            gestorrepository.findByEmail(gestorlogin.getEmail());

					    // se encontrou usuário, verifica senha
					    if (gestor.isPresent()) {

					    	GestorEntity GestorEncontrado = gestor.get();

					        // compara senha enviada com senha armazenada (hash)
					        if (encoder.matches(
					        		gestorlogin.getSenha(),
					                GestorEncontrado.getSenha())) {

					            return ResponseEntity.ok(GestorEncontrado);
					        }
					    }

					    // se não encontrou usuário ou senha não bate, retorna 401
					    return ResponseEntity.status(401).build();
					}
					
				}
			
		

