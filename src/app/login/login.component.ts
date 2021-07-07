import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  adminLogged;

  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.adminLogged = localStorage.getItem("adminLogged");
    if (this.adminLogged === 'true') {
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit() {
    if (this.loginForm.value.username === 'dgw' && this.loginForm.value.password === 'dgw') {
      this.router.navigate(['/dashboard']);
      localStorage.setItem("adminLogged", "true");
    } else {
      alert("Wrong Credentials!");
    }
  }

}
