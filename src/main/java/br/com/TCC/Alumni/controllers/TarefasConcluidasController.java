package br.com.TCC.Alumni.controllers;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import br.com.TCC.Alumni.entity.EstagiariosEntity;
import br.com.TCC.Alumni.entity.TarefasConcluidasEntity;
import br.com.TCC.Alumni.entity.TarefasEntity;
import br.com.TCC.Alumni.repository.EstagiariosRepository;
import br.com.TCC.Alumni.repository.TarefasConcluidasRepository;
import br.com.TCC.Alumni.repository.TarefasRepository;

@RestController
@RequestMapping("/TarefasConcluidas")
public class TarefasConcluidasController {

    @Autowired
    private TarefasConcluidasRepository repository;

    @Autowired
    private TarefasRepository tarefasRepository;
    
    @Autowired
    private EstagiariosRepository estagiariosRepository;

    @GetMapping("/BuscarTodos")
    public List<TarefasConcluidasEntity> buscarTodos(){
        return repository.findAll();
    }
    
    @PutMapping("/Aprovar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TarefasConcluidasEntity aprovar(@PathVariable Integer id){

        TarefasConcluidasEntity entrega =
                repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada"));

        entrega.setStatus("APROVADA");

        return repository.save(entrega);

    }
    
    @PutMapping("/Reprovar/{id}")
    @ResponseStatus(HttpStatus.OK)
    public TarefasConcluidasEntity reprovar(@PathVariable Integer id){

        TarefasConcluidasEntity entrega =
                repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Entrega não encontrada"));

        entrega.setStatus("REPROVADA");

        return repository.save(entrega);

    }
    
   
    @PostMapping("/Gravar")
    @ResponseStatus(HttpStatus.CREATED)
    public TarefasConcluidasEntity gravar(

            @RequestParam Integer idEstagiario,
            @RequestParam Integer idTarefa,
            @RequestParam(required = false) String observacoes,
            @RequestParam MultipartFile arquivo

    ) throws IOException {


        String nomeArquivo = UUID.randomUUID().toString()
                + "_"
                + arquivo.getOriginalFilename();


        Path caminho = Paths.get(
                "//192.168.10.22/deploy/alumini/img/" + nomeArquivo
        );


        Files.write(caminho, arquivo.getBytes());



        EstagiariosEntity estagiario = estagiariosRepository
                .findById(idEstagiario)
                .orElseThrow(() ->
                        new RuntimeException("Estagiário não encontrado")
                );



        TarefasEntity tarefa = tarefasRepository
                .findById(idTarefa)
                .orElseThrow(() ->
                        new RuntimeException("Tarefa não encontrada")
                );

        TarefasConcluidasEntity concluida = new TarefasConcluidasEntity();

        concluida.setDataHora(new Date());
        concluida.setObservacoes(observacoes);
        concluida.setUploadTarefas(nomeArquivo);
        concluida.setEstagiario(estagiario);
        concluida.setTarefasEntity(tarefa);

        return repository.save(concluida);

    }

}