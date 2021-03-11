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
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent as AdminLoginComponent } from './components/admin/login/login.component';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { TeacherAuthGuard } from './core/guards/teacher-auth.guard';
import { TeacherClassesComponent } from './components/admin/teacher-classes/teacher-classes.component';
import { TeacherExamsComponent } from './components/admin/teacher-exams/teacher-exams.component';
import { TeacherColloquiesComponent } from './components/admin/teacher-colloquies/teacher-colloquies.component';
import { EditClassComponent } from './components/admin/teacher-classes/edit-class/edit-class.component';


const routes: Routes = [
  {path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full'},
  {path: 'admin', component: AdminComponent, children: [
    {path: 'login', component: AdminLoginComponent},
    {path: 'dashboard', component: AdminDashboardComponent, canActivate: [TeacherAuthGuard]},
    {path: 'classes', component: TeacherClassesComponent, canActivate: [TeacherAuthGuard]},
    {path: 'classes/:id', component: EditClassComponent, canActivate: [TeacherAuthGuard]},
    {path: 'exams', component: TeacherExamsComponent, canActivate: [TeacherAuthGuard]},
    {path: 'colloquies', component: TeacherColloquiesComponent, canActivate: [TeacherAuthGuard]},
    {path: 'settings', component: UserSettingsComponent, canActivate: [TeacherAuthGuard]}
  ]},
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
