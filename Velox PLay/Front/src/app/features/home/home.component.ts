import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { FilmeService } from '@core/services/filme.service';
import { Filme } from '@core/model/filmes';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  filmes: Filme[] = [];
  isLua: boolean = false;
  currentYear = new Date().getFullYear() 
  
  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private filmeService: FilmeService
  ) {}

  goLogin() {
    this.router.navigate(['/login']);
  }

  ngOnInit(): void {
    this.applyTheme();
    this.carregarFilmes();
  }

  toggleLua(): void {
    this.isLua = !this.isLua;
    this.applyTheme();
  }

  private applyTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const body = this.document.body;
    body.classList.remove('dark-theme', 'light-theme');

    if (this.isLua) {
      body.classList.add('dark-theme');
    } else {
      body.classList.add('light-theme');
    }
  }

  anuncios = [
    { titulo: 'Velox Play™', descricao: 'Gerenciamento completo e rápido.' },
    { titulo: '💡 Painel Inteligente', descricao: 'Controle tudo de forma prática.' },
    { titulo: '📊 Estatísticas Reais', descricao: 'Veja os números em tempo real.' },
  ];

  slideAtivo = 0;

    carregarFilmes(): void {
    this.filmeService.getFilmes().subscribe(
      (data) => {
        this.filmes = data;
      },
      (error) => console.error('Erro ao carregar filmes', error)
    );
  }

  termoBusca: string = '';
  /*
  get filmesFiltrados() {
    return this.filmes.filter(f =>
      f.titulo.toLowerCase().includes(this.termoBusca.toLowerCase())
    );
  }*/

}
