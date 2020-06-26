import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  usuario: UsuarioModel = new UsuarioModel();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {}

  login(form: NgForm) {
    if (form.invalid) return;

    this.auth.login(this.usuario).subscribe(
      (resp) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', resp.user.id);
        Swal.fire({
          title: 'Iniciar Sesión',
          allowOutsideClick: false,
          icon: 'success',
          text: resp.msg
        })
        .then(()=>{
          this.router.navigate(['/tasks']);
        })
      },
      (err) => {
        Swal.fire({
          title: 'Error al iniciar Sesión',
          allowOutsideClick: false,
          icon: 'error',
          text: err.error.msg
        })
      }
    );
  }
  
}
