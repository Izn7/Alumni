package br.com.TCC.Alumni.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "TarefasUsuarios")
public class TarefasUsuarioEntity implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String descricao;
	private String status;
	private boolean prioridade;
	
	

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public boolean isPrioridade() {
		return prioridade;
	}

	public void setPrioridade(boolean prioridade) {
		this.prioridade = prioridade;
	}

	public TarefasEntity getTarefasEntity() {
		return tarefasEntity;
	}

	public void setTarefasEntity(TarefasEntity tarefasEntity) {
		this.tarefasEntity = tarefasEntity;
	}

	public EstagiariosEntity getEstagiarios() {
		return Estagiarios;
	}

	public void setEstagiarios(EstagiariosEntity estagiarios) {
		Estagiarios = estagiarios;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	@ManyToOne
	@JoinColumn(name = "idTarefas")
	private TarefasEntity tarefasEntity;
	
	@ManyToOne
	@JoinColumn (name = "idEstagiarios")
	private EstagiariosEntity Estagiarios;
}
