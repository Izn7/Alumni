package br.com.TCC.Alumni.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TarefasConcluidas")
public class TarefasConcluidasEntity {
		
	
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private int id;
	
		private Date dataHora;
		
		private String observacoes;
		
		private String uploadTarefas;

		

		@ManyToOne
		@JoinColumn(name = "idEstagiario")
		private EstagiariosEntity estagiario;
		
		@OneToOne
		@JoinColumn(name ="idTarefa")
		private TarefasEntity tarefasEntity;

		public int getId() {
			return id;
		}

		public void setId(int id) {
			this.id = id;
		}

		public Date getDataHora() {
			return dataHora;
		}

		public void setDataHora(Date dataHora) {
			this.dataHora = dataHora;
		}

		public TarefasEntity getTarefasEntity() {
			return tarefasEntity;
		}

		public void setTarefasEntity(TarefasEntity tarefasEntity) {
			this.tarefasEntity = tarefasEntity;
		}
		public String getObservacoes() {
			return observacoes;
		}

		public void setObservacoes(String observacoes) {
			this.observacoes = observacoes;
		}
	
		public String getUploadTarefas() {
			return uploadTarefas;
		}

		public void setUploadTarefas(String uploadTarefas) {
			this.uploadTarefas = uploadTarefas;
		}

		public EstagiariosEntity getEstagiario() {
			return estagiario;
		}

		public void setEstagiario(EstagiariosEntity estagiario) {
			this.estagiario = estagiario;
		}

		
}
