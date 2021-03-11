import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClassesComponent } from './components/classes/classes.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ExamsComponent } from './components/exams/exams.component';
import { ColloquiesComponent } from './components/colloquies/colloquies.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent as AdminLoginComponent } from './components/admin/login/login.component';
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { TeacherClassesComponent } from './components/admin/teacher-classes/teacher-classes.component';
import { TeacherExamsComponent } from './components/admin/teacher-exams/teacher-exams.component';
import { TeacherColloquiesComponent } from './components/admin/teacher-colloquies/teacher-colloquies.component';
import { MomentDatePipe } from './shared/pipes/moment-date.pipe';
import { EditClassComponent } from './components/admin/teacher-classes/edit-class/edit-class.component';
import { AddClassDialogComponent } from './components/admin/teacher-classes/add-class-dialog/add-class-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ClassesComponent,
    ScheduleComponent,
    ExamsComponent,
    ColloquiesComponent,
    UserSettingsComponent,
    AdminComponent,
    AdminLoginComponent,
    AdminDashboardComponent,
    TeacherClassesComponent,
    TeacherExamsComponent,
    TeacherColloquiesComponent,
    MomentDatePipe,
    EditClassComponent,
    AddClassDialogComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatTabsModule,
    MatSelectModule,
    DragDropModule,
    NgxSpinnerModule,
    MatRippleModule,
    MatDialogModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
