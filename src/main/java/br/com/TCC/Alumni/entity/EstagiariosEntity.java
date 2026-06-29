package br.com.TCC.Alumni.entity;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.*;

@Entity
@Table(name = "estagiario")
public class EstagiariosEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, length = 80)
    private String nome;

    @Column(nullable = false, length = 80)
    private String sobrenome;

    @Column(nullable = false, unique = true, length = 120)
    private String email;

    @Column(nullable = false, unique = true, length = 14)
    private String cpf;

    private Date dataNascimento;

    @Column(length = 100)
    private String instituicao;

    @Column(length = 100)
    private String curso;

    @Column(length = 30)
    private String semestre;

    @Column(length = 100)
    private String cargo;

    private Date inicioEstagio;

    private Date terminoEstagio;

    @Column(length = 20)
    private String cargaHoraria;

    @Column(nullable = false)
    private String senha;

    @Column(length = 255)
    private String fotoPerfil;

   
    @ManyToOne
    @JoinColumn(name = "id_gestor")
    private GestorEntity gestor;

    private boolean isFirstLogin;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSobrenome() {
        return sobrenome;
    }

    public void setSobrenome(String sobrenome) {
        this.sobrenome = sobrenome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCpf() {
        return cpf;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public Date getDataNascimento() {
        return dataNascimento;
    }

    public void setDataNascimento(Date dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getInstituicao() {
        return instituicao;
    }

    public void setInstituicao(String instituicao) {
        this.instituicao = instituicao;
    }

    public String getCurso() {
        return curso;
    }

    public void setCurso(String curso) {
        this.curso = curso;
    }

    public String getSemestre() {
        return semestre;
    }

    public void setSemestre(String semestre) {
        this.semestre = semestre;
    }

    public String getCargo() {
        return cargo;
    }

    public void setCargo(String cargo) {
        this.cargo = cargo;
    }

    public Date getInicioEstagio() {
        return inicioEstagio;
    }

    public void setInicioEstagio(Date inicioEstagio) {
        this.inicioEstagio = inicioEstagio;
    }

    public Date getTerminoEstagio() {
        return terminoEstagio;
    }

    public void setTerminoEstagio(Date terminoEstagio) {
        this.terminoEstagio = terminoEstagio;
    }

    public String getCargaHoraria() {
        return cargaHoraria;
    }

    public void setCargaHoraria(String cargaHoraria) {
        this.cargaHoraria = cargaHoraria;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getFotoPerfil() {
        return fotoPerfil;
    }

    public void setFotoPerfil(String fotoPerfil) {
        this.fotoPerfil = fotoPerfil;
    }

    public GestorEntity getGestor() {
        return gestor;
    }

    public void setGestor(GestorEntity gestor) {
        this.gestor = gestor;
    }

	public boolean isFirstLogin() {
		return isFirstLogin;
	}

	public void setFirstLogin(boolean isFirstLogin) {
		this.isFirstLogin = isFirstLogin;
	}

}