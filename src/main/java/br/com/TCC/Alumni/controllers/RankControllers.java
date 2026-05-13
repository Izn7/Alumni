package br.com.TCC.Alumni.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import br.com.TCC.Alumni.entity.RankEntity;
import br.com.TCC.Alumni.repository.RankRepository;


@RestController
@RequestMapping("/Rank")
public class RankControllers {


	
		
		

						@Autowired
						private RankRepository rankRepository;
						
						@GetMapping("/BuscarTodos")
						@ResponseStatus(HttpStatus.OK)
						public List<RankEntity> buscarTodosRanks(){
							return rankRepository.findAll();
							
						}
}
