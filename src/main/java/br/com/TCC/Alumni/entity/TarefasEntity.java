package br.com.TCC.Alumni.entity;

import java.util.Date;


import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
//Definição da tabela

@Entity
@Table(name = "Tarefas")
public class TarefasEntity {

	
	
	@ManyToOne
	@JoinColumn (name = "idGestor")
	private GestorEntity Gestor;
	
	//atributos da tabela
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String titulo;
	private Date dataHora;
	private int pontos;

	
	public int getPontos() {
		return pontos;
	}
	public void setPontos(int pontos) {
		this.pontos = pontos;
	}
	public String getTitulo() {
		return titulo;
	}
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	public Date getDataHora() {
		return dataHora;
	}
	public void setDataHora(Date dataHora) {
		this.dataHora = dataHora;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public GestorEntity getGestor() {
		return Gestor;
	}
	public void setGestor(GestorEntity gestor) {
		Gestor = gestor;
	}

	
	
}
