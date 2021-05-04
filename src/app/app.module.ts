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
import { MatTableModule } from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
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
import { DashboardComponent as AdminDashboardComponent } from './components/admin/dashboard/dashboard.component';
import { LoginComponent as AdminLoginComponent } from './components/admin/login/login.component';
import { TeacherClassesComponent } from './components/admin/teacher-classes/teacher-classes.component';
import { EditClassComponent } from './components/admin/teacher-classes/edit-class/edit-class.component';
import { AddClassDialogComponent } from './components/admin/teacher-classes/add-class-dialog/add-class-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule, OWL_DATE_TIME_FORMATS } from '@danielmoncada/angular-datetime-picker';
import { AddExamComponent } from './components/admin/teacher-classes/add-exam/add-exam.component';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { EditNotificationComponent } from './components/admin/dashboard/edit-notification/edit-notification.component';
import { SuperadminComponent } from './components/superadmin/superadmin.component';
import { ManageTeachersComponent } from './components/superadmin/manage-teachers/manage-teachers.component';
import { ManageStudentsComponent } from './components/superadmin/manage-students/manage-students.component';
import { ManageClassesComponent } from './components/superadmin/manage-classes/manage-classes.component';
import { ManageTeacherDialogComponent } from './components/superadmin/manage-teachers/manage-teacher-dialog/manage-teacher-dialog.component';

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
    AdminDashboardComponent,
    AdminLoginComponent,
    TeacherClassesComponent,
    EditClassComponent,
    AddClassDialogComponent,
    AddExamComponent,
    ConfirmDialogComponent,
    EditNotificationComponent,
    SuperadminComponent,
    ManageTeachersComponent,
    ManageStudentsComponent,
    ManageClassesComponent,
    ManageTeacherDialogComponent
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
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
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
