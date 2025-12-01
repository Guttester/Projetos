import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  isLua: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  goAdmin() {
    this.router.navigate(['/admin']);
  }

  Voltar() {
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
    this.applyTheme();
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
}
