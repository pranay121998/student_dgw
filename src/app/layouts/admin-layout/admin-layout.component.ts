import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  adminLogged;
  constructor(private router: Router) { }
  ngOnInit() {
    this.adminLogged = localStorage.getItem("adminLogged");
    if (this.adminLogged !== 'true') {
      this.router.navigate(['/login']);
    }
  }
}
