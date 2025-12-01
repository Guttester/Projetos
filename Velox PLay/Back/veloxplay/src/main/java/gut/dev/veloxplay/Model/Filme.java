package gut.dev.veloxplay.Model;

import jakarta.persistence.*;
import gut.dev.veloxplay.Enum.Genero;

@Entity
@Table(name = "filmes")
public class Filme {
	//==================================>[VARIAVEIS]<=============================
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false, unique = true, length = 100)
	private String titulo;

	@Column(nullable = false, length = 500)
	private String descricao;

	@Enumerated(EnumType.STRING)
	private Genero genero;
	
	@Column(nullable = false, length = 255)
	private String urlVideo;

	@Column(nullable = false, length = 255)
	private String urlCapa;
    
	//==================================>[CONSTRUTOR]<============================
	public Filme(){ }
	public Filme(Long ID, String TITULO, String DESCRICAO, Genero GENERO, String URLVIDEO,
					String URLCAPA){
	    this.id = ID;
	    this.titulo = TITULO;
	    this.descricao = DESCRICAO;
	    this.genero = GENERO;
	    this.urlVideo = URLVIDEO;
	    this.urlCapa = URLCAPA;
	}
	//==================================>[SETS]<==================================
	public void setId(Long ID) { this.id = ID; }
	public void setTitulo(String TITULO) { this.titulo = TITULO; }
	public void setDescricao(String DESCRICAO) { this.descricao = DESCRICAO; }
	public void setGenero(Genero GENERO) { this.genero = GENERO; }
	public void setUrlVideo(String URLVIDEO) { this.urlVideo = URLVIDEO; }
	public void setUrlCapa(String URLCAPA) { this.urlCapa = URLCAPA; }
	//==================================>[GETS]<==================================
	public Long getId() { return this.id; }
	public String getTitulo() { return this.titulo; }
	public String getDescricao() { return this.descricao; }
	public Genero getGenero() { return this.genero; }
	public String getUrlVideo() { return this.urlVideo; }
	public String getUrlCapa() { return this.urlCapa; }
	//==================================>[toString]<==============================
	@Override
	public String toString() {
		return "Filme [id=" + id + ", titulo=" + titulo + ", descricao=" + descricao + ", genero=" + genero + ", urlVideo=" + urlVideo + ", urlCapa=" + urlCapa + "]"; 
	}


}