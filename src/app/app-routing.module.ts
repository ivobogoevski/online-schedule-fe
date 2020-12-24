import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ColloquiesComponent } from './components/colloquies/colloquies.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '', component: HeaderComponent, canActivate: [AuthGuard], children: [
    {path: 'dashboard', component: DashboardComponent},
    {path: 'classes', component: ClassesComponent},
    {path: 'schedule', component: ScheduleComponent},
    {path: 'exams', component: ExamsComponent},
    {path: 'colloquies', component: ColloquiesComponent},
    {path: 'settings', component: UserSettingsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
