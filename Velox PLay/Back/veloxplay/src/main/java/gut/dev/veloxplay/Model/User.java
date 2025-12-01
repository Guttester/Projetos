package gut.dev.veloxplay.Model;


import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
	//==================================>[VARIAVEIS]<=============================
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true, length = 40)
    private String nome;
    
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    
    @Column(nullable = false)
    private String senha;
    
    @ManyToMany
    @JoinTable(
        name = "user_favoritos",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "filme_id")
    )
    private List<Filme> favoritos = new ArrayList<>();
    
	//==================================>[CONSTRUTOR]<============================
	public User(){}
	public User(Long ID, String NOME, String EMAIL, String SENHA ){
		this.id= ID;
		this.nome= NOME;
		this.email= EMAIL;
		this.senha= SENHA;
	}
	//==================================>[SETS]<==================================
	public void setId(Long ID){ this.id= ID; }
	public void setNome(String NOME){ this.nome= NOME; }
	public void setEmail(String EMAIL){ this.email= EMAIL; }
	public void setSenha(String SENHA){ this.senha= SENHA; }
	public void setFavoritos(List<Filme> favoritos) { this.favoritos = favoritos; }
    
	//==================================>[GETS]<==================================
	public Long getId(){ return id; }
	public String getNome(){ return nome; }
	public String getEmail(){ return email; }
	public String getSenha(){ return senha; }
	public List<Filme> getFavoritos() { return favoritos; }
	//==================================>[Utilitário]<============================
    public void adicionarFavorito(Filme filme) {
        if (!favoritos.contains(filme)) {
            favoritos.add(filme);
        }
    }

    public void removerFavorito(Filme filme) {
        favoritos.remove(filme);
    }
    
	@Override
	public String toString() {
		return "names [id= "+id+ " nome= " +nome+ " email=" +email+ " senha="+senha+ " ]";
	}


}