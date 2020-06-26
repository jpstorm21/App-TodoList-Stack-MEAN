import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { AuthGuard } from './guard/auth.guard';
import { TasksComponent } from './pages/tasks/tasks.component';
import { RegisterTaskComponent } from './pages/register-task/register-task.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegistroComponent,
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register-work',
    component: RegisterTaskComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'work/:id',
    component: RegisterTaskComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
