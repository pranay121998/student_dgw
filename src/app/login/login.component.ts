import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl('', Validators.compose([Validators.required, Validators.email])),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
  });

  constructor(private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.loginForm.value.email);
    this.auth.SignIn(this.loginForm.value.email, this.loginForm.value.password);

  }

  signOut() {
    this.auth.signOut();
  }

}
