import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TaskModel } from '../models/task.model';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

const API = environment.api;

@Injectable({
  providedIn: 'root',
})
export class TaskService {

  token: string;

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
    this.token = auth.getToken();
  }

  register(task: TaskModel) {
    let request = `${API}/task/register`;
    return this.http.post<any>(request, task, {
      headers: { authorization: this.token },
    });
  }

  getTasks() {
    let user = localStorage.getItem('user');
    let request = `${API}/task/tasks/${user}`;
    return this.http.get<any>(request, {
      headers: { authorization: this.token },
    });
  }

  getTaskById(id: string){
    let request = `${API}/task/task/${id}`;
    return this.http.get<TaskModel>(request, {
      headers: { authorization: this.token },
    });
  }

  changeState(id: string,task: TaskModel){
    let request = `${API}/task/task/${id}`;
    return this.http.put<any>(request, task, {
      headers: { authorization: this.token },
    });
  }
}
