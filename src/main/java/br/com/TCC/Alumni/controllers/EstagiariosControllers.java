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

import br.com.TCC.Alumni.entity.EstagiariosEntity;
import br.com.TCC.Alumni.repository.EstagiariosRepository;


@RestController
@RequestMapping("/Estagiarios")
public class EstagiariosControllers {



					@Autowired
					private EstagiariosRepository estagiariosRepository;
					
					@Autowired
					private BCryptPasswordEncoder encoder;
					
					
					@GetMapping("/BuscarTodos")
					@ResponseStatus(HttpStatus.OK)
					public List<EstagiariosEntity> buscarTodosEstagiarios(){
						return estagiariosRepository.findAll();
						
					}
					@GetMapping("/BuscarPorId/{id}")
					@ResponseStatus(HttpStatus.OK)
					public Optional<EstagiariosEntity> buscarEstagiariosPorId(@PathVariable Integer id){
						return estagiariosRepository.findById(id);
						
					}
					@PostMapping("/Gravar")
					@ResponseStatus(HttpStatus.CREATED)
					public EstagiariosEntity gravarEstagiarios(@RequestBody EstagiariosEntity estagiarios, Integer id) {
						estagiarios.setFirstLogin(true);
						estagiarios.setSenha(encoder.encode(estagiarios.getSenha()));
						return estagiariosRepository.save(estagiarios);
						
					}
					
					@PutMapping("/Atualizar/{id}")
					@ResponseStatus(HttpStatus.OK)
					public EstagiariosEntity atualizarEstagiarios(@PathVariable Integer id, @RequestBody EstagiariosEntity estagiarios) {
						EstagiariosEntity estagiarios1 = estagiariosRepository.findById(id).orElseThrow(() -> new RuntimeException("Estagiário não encontrado"));
						estagiarios1.setFirstLogin(false);
						estagiarios1.setSenha(encoder.encode(estagiarios.getSenha()));
						return estagiariosRepository.save(estagiarios1);
						
					}
					@DeleteMapping("/Deletar/{id}")
					@ResponseStatus(HttpStatus.OK)
					public String deletarEstagiarios(@PathVariable Integer id) {
						
						if (estagiariosRepository.existsById(id)) {
							estagiariosRepository.deleteById(id);
								return "Usuario deletado com sucesso!";
						}
						return "Usuario não encontrado!";
						
						}
					
					@PostMapping("/login")
					public ResponseEntity<EstagiariosEntity> login(
					        @RequestBody EstagiariosEntity estagiariologin) {

					    // busca usuário por email
					    Optional<EstagiariosEntity> estagiarios =
					    		estagiariosRepository.findByEmail(estagiariologin.getEmail());

					    // se encontrou usuário, verifica senha
					    if (estagiarios.isPresent()) {

					    	EstagiariosEntity estagiariosEncontrado = estagiarios.get();

					        // compara senha enviada com senha armazenada (hash)
					        if (encoder.matches(
					        		estagiariologin.getSenha(),
					        		estagiariosEncontrado.getSenha())) {

					            return ResponseEntity.ok(estagiariosEncontrado);
					        }
					    }

					    // se não encontrou usuário ou senha não bate, retorna 401
					    return ResponseEntity.status(401).build();
					}
			
		}
	
	

