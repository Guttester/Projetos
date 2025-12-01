import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Import componentes das telas
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { AdminComponent } from './features/admin/admin.component';
import { UsersComponent } from './features/admin/page/users/users.component';
import { FilmesComponent } from './features/admin/page/filmes/filmes.component'; 

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'users', component: UsersComponent},
  { path: 'filmes', component: FilmesComponent},
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
