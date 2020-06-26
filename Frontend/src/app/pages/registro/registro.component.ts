import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from '../../models/usuario.model';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
  }

  register(form: NgForm) {
    if (form.invalid) return;

    this.auth.register(this.usuario).subscribe(
      (resp) => {
        Swal.fire({
          title: 'Registro de Usuaurio',
          allowOutsideClick: false,
          icon: 'success',
          text: resp.msg
        })
        this.router.navigate(['']);
      },
      (err) => {
        Swal.fire({
          title: 'Error al Registrar Usuario',
          allowOutsideClick: false,
          icon: 'error',
          text: err.error.msg
        })
      }
    );
  }

}
