import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-superadmin',
  templateUrl: './superadmin.component.html',
  styleUrls: ['./superadmin.component.scss']
})
export class SuperadminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logOut(){
    localStorage.removeItem('os_auth');
    localStorage.removeItem('os_auth_refresh');
  }

}
