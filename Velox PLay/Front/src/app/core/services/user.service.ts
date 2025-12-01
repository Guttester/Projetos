import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Users } from '@core/model/users'; // interface do model
import { Filme } from '@core/model/filmes';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  private apiUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(this.apiUrl);
  }

  getUserById(id: number): Observable<Users> {
    return this.http.get<Users>(`${this.apiUrl}/${id}`);
  }

  createUser(user: Users): Observable<Users> {
    return this.http.post<Users>(this.apiUrl, user);
  }

  updateUser(id: number, user: Users): Observable<Users> {
    return this.http.put<Users>(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  adicionarFavorito(userId: number, filmeId: number): Observable<Users> {
    return this.http.post<Users>(`${this.apiUrl}/${userId}/favoritos/${filmeId}`, {});
  }

  removerFavorito(userId: number, filmeId: number): Observable<Users> {
    return this.http.delete<Users>(`${this.apiUrl}/${userId}/favoritos/${filmeId}`);
  }

  getFavoritos(userId: number): Observable<Filme[]> {
    return this.http.get<Filme[]>(`${this.apiUrl}/${userId}/favoritos`);
  }
}
