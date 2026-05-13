package br.com.TCC.Alumni.entity;



import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Rank")
public class RankEntity {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String premiacao;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPremiacao() {
		return premiacao;
	}
	public void setPremiacao(String premiacao) {
		this.premiacao = premiacao;
	}
	
}
