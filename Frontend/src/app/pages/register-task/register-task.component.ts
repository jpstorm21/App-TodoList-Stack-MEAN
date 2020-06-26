import { Component, OnInit } from '@angular/core';
import { TaskModel } from '../../models/task.model';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-task',
  templateUrl: './register-task.component.html',
  styleUrls: ['./register-task.component.scss'],
})
export class RegisterTaskComponent implements OnInit {
  task: TaskModel = new TaskModel();
  id: string = null;

  constructor(
    private router: Router,
    private TaskService: TaskService,
    private active: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.active.params.subscribe((resp) => {
      this.id = resp.id;
      this.TaskService.getTaskById(this.id).subscribe((resp) => {
        this.task = resp;
      });
    });
  }

  register(form: NgForm) {
    if (form.invalid) return;
    this.task.user = localStorage.getItem('user');
    if (this.id) {
      this.TaskService.changeState(this.id, this.task).subscribe(resp =>{
        Swal.fire({
          title: 'Registro de Tarea',
          allowOutsideClick: false,
          icon: 'success',
          text: resp.msg,
        });
        this.router.navigate(['/tasks']);
      })
    } else {
      this.TaskService.register(this.task).subscribe(
        (resp) => {
          Swal.fire({
            title: 'Registro de Tarea',
            allowOutsideClick: false,
            icon: 'success',
            text: resp.msg,
          });
          this.router.navigate(['/tasks']);
        },
        (err) => {
          Swal.fire({
            title: 'Error al Registrar la tarea',
            allowOutsideClick: false,
            icon: 'error',
            text: 'No se pudo registrar la tarea',
          });
        }
      );
    }
  }

  onChange(e){
    this.task.state = e.target.checked;
  }
}
