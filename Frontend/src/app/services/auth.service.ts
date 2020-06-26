import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { Router } from '@angular/router';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(user: UsuarioModel) {
    let request = `${API}/auth/login`;
    return this.http.post<any>(request, user);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['']);
  }

  checkLogin(): boolean {
    let token = localStorage.getItem('token');
    if(token) return true;
    else return false;
  }

  register(user: UsuarioModel) {
    let request = `${API}/user/register`;
    return this.http.post<any>(request, user);
  }

  getToken(){
    return localStorage.getItem('token');
  }
}
