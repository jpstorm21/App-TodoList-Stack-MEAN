import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(resp =>{
      this.tasks= resp;
    })
  }
}
