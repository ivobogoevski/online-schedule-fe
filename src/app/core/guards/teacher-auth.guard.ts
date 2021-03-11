import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TeacherAuthGuard implements CanActivate {

  constructor(private router: Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (localStorage.getItem('os_auth')) {
        const teacher: any = jwt_decode(localStorage.getItem('os_auth'));
        const rt: any = jwt_decode(localStorage.getItem('os_auth_refresh'));
        if(teacher.Office && rt.Type === '0'){
          return true;
        } else {
          this.router.navigateByUrl('/admin/login');
          return false;
        }
      }
      this.router.navigateByUrl('/admin/login');
      return false;
  }

}
