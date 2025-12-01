import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FilmeService } from '@core/services/filme.service';
import { Filme } from '@core/model/filmes';
import { Genero, GeneroLabel } from '@core/model/genero';

@Component({
  selector: 'app-filmes',
  standalone: false,
  templateUrl: './filmes.component.html',
  styleUrl: './filmes.component.css'
})
export class FilmesComponent implements OnInit {
  filmes: Filme[] = [];
  novoFilme: Filme = { titulo: '', descricao: '', urlVideo: '', urlCapa: '', genero: undefined };
  filmeEdit: Filme = { titulo: '', descricao: '', urlVideo: '', urlCapa: '', genero: Genero.ACAO };
  GeneroLabel = GeneroLabel;


  isSidebarExpanded = true;
  isModalOpen = false;
  isModalUpdate = false;
  inputStat = true;

  tituloInvalido: boolean = false;
  generoInvalido: boolean = false;
  descricaoInvalido: boolean = false;

  mostrarVideo: boolean = false;
  mostrarCapa: boolean = false;

  generos = Object.values(Genero);

  constructor(private filmeService: FilmeService) {}

  ngOnInit(): void {
    this.carregarFilmes();
  }

  onSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  openModal() {
    this.isModalOpen = true;
  }

  carregarFilmes(): void {
    this.filmeService.getFilmes().subscribe(
      (data) => {
        this.filmes = data;
      },
      (error) => console.error('Erro ao carregar filmes', error)
    );
  }

  adicionarFilme(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    this.filmeService.createFilme(this.novoFilme).subscribe(
      (filmeCriado) => {
        this.filmes.push(filmeCriado);
        this.novoFilme = { titulo: '', descricao: '', urlVideo: '', urlCapa: '', genero: Genero.ACAO };
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Erro ao criar filme', error);
        alert('Erro ao criar filme. Verifique se os dados são válidos.');
      }
    );
  }

  atualizarFilme(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.filmeEdit && this.filmeEdit.id) {
      this.filmeService.updateFilme(this.filmeEdit.id, this.filmeEdit).subscribe(
        () => {
          this.carregarFilmes();
          this.filmeEdit = { titulo: '', descricao: '', urlVideo: '', urlCapa: '', genero: Genero.ACAO };
          this.isModalUpdate = false;
          alert('Filme atualizado com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar filme', error);
          alert('Erro ao atualizar filme. Tente novamente.');
        }
      );
    }
  }

  excluirFilme(id: number): void {
    this.filmeService.deleteFilme(id).subscribe(
      () => {
        this.filmes = this.filmes.filter(filme => filme.id !== id);
      },
      (error) => console.error('Erro ao excluir filme', error)
    );
  }

  // Modal
  confirmCloseModal() {
    this.closeModal();
  }

  updateModal(filme: Filme) {
    console.log('Filme recebido:', filme);
    this.filmeEdit = { ...filme };
    this.isModalUpdate = true;
  }

  closeModal() {
    this.inputStat = true;
    const confirmar = confirm('Tem certeza que deseja fechar?');
    if (confirmar) {
      this.isModalOpen = false;
      this.isModalUpdate = false;
      this.novoFilme = new Filme();
    }
  }

  editInput() {
    this.inputStat = !this.inputStat;
    this.mostrarVideo = false;
    this.mostrarCapa = false;
  }
}