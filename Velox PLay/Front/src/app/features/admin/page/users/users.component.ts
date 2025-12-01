import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '@core/services/user.service';
import { Users } from '@core/model/users';
import { FilmeService } from '@core/services/filme.service';
import { Filme } from '@core/model/filmes';

@Component({
  selector: 'app-users',
  standalone: false,
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  filmes: Filme[]=[];
  filmeSelecionado: Filme | null = null;
  users: Users[] = [];
  novoUser: Users= new Users();
  userEdit: Users = { nome: '', email: '', senha: '' };

  isSidebarExpanded = true;
  isModalOpen = false;
  isModalUpdate = false;
  inputStat = true;

  nameInvalido: boolean = false;
  tipoInvalido: boolean = false;
  senhaInvalido: boolean = false;
  emailInvalido: boolean = false;

  aceiteTermos: boolean = false;
  receberNotificacoes: boolean = false;

  mostrarSenha: boolean = false;
  mostrarConfirmacao: boolean = false;
  
  constructor(private userService: UserService, private filmeService: FilmeService) {}

  onSidebarToggle(expanded: boolean) {
    this.isSidebarExpanded = expanded;
  }

  openModal(){ this.isModalOpen = true; }

  ngOnInit(): void {
    this.carregarUsers();
    this.carregarFilmes();
  }

  carregarUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => console.error('Erro ao carregar usuários', error)
    );
  }

  carregarFilmes(): void {
    this.filmeService.getFilmes().subscribe(
      (data) => {
        this.filmes = data;
      },
      (error) => console.error('Erro ao carregar filmes', error)
    );
  }

  adicionarUser(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    this.userService.createUser(this.novoUser).subscribe(
      (userCriado) => {
        this.users.push(userCriado);
        this.novoUser = { nome: '', email: '', senha: '' };
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Erro ao criar usuário', error);
        alert('Erro ao criar usuário. Verifique se os dados são válidos.');
      }
    );
  }

  atualizarUser(form: NgForm): void {
    form.form.markAllAsTouched();

    if (form.invalid) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    if (this.userEdit && this.userEdit.id) {
      this.userService.updateUser(this.userEdit.id, this.userEdit).subscribe(
        () => {
          this.carregarUsers();
          this.userEdit = { nome: '', email: '', senha: '' };
          this.isModalUpdate = false;
          alert('Usuário atualizado com sucesso!');
        },
        (error) => {
          console.error('Erro ao atualizar usuário', error);
          alert('Erro ao atualizar usuário. Tente novamente.');
        }
      );
    }
  }

  excluirUser(id: number): void {
    this.userService.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
      },
      (error) => console.error('Erro ao excluir usuário', error)
    );
  }

  // Inferências de html
  confirmCloseModal() {
    this.closeModal();
  }
  
  updateModal(user: Users) {
    console.log('Projeto recebido:', user);
    this.userEdit = { ...user };
    this.isModalUpdate = true;
  }

  closeModal() {
    this.inputStat = true;
    const confirmar = confirm('Tem certeza que deseja fechar?');
    if (confirmar) {
      this.isModalOpen = false;
      this.isModalUpdate = false;
      this.novoUser = new Users()
    }
  }
  editInput(){ 
    if(this.inputStat){
      this.inputStat= false; 
    } else {
      this.inputStat= true; 
    }
    this.mostrarSenha=false
    this.mostrarConfirmacao= false
  }

  onFilmeSelecionadoChange(): void {
    if (!this.userEdit || !this.userEdit.id || !this.filmeSelecionado) {
      this.filmeSelecionado = null;
      return;
    }
    const userId = this.userEdit.id;
    const filmeId = this.filmeSelecionado.id!;
    const jaExiste = this.userEdit.favoritos?.some(f => f.id === filmeId);
    if (!jaExiste) {
      this.userService.adicionarFavorito(userId, filmeId).subscribe(userAtualizado => {
        this.userEdit.favoritos = userAtualizado.favoritos || [];
        this.filmeSelecionado = null;
      });
    } else {
      this.userService.removerFavorito(userId, filmeId).subscribe(userAtualizado => {
        this.userEdit.favoritos = userAtualizado.favoritos || [];
        this.filmeSelecionado = null;
      });
    }
  }

  carregarFavoritos(userId: number) {
  this.userService.getFavoritos(userId).subscribe({
    next: (lista) => {
      this.userEdit.favoritos = lista;
    },
    error: (err) => console.error(err)
  });
}
}