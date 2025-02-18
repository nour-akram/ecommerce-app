import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../app/Services/auth.service';
import { AuthwithApiService } from '../../app/Services/authwith-api.service';
import { IUser } from '../../Models/iuser';
import { FormsModule } from '@angular/forms';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  isAuthenticated: boolean = false;
  user: IUser = {} as IUser;
  errormes: string = "";

  constructor(private authService: AuthService, private authApiService: AuthwithApiService,private router :Router) {}

  ngOnInit(): void {
    this.authService.getUserLogged().subscribe(isLogged => {
      this.isAuthenticated = isLogged;
    });
  }

  login(): void {
    this.authApiService.login(this.user).subscribe({
      next: (data) => {
        // console.log("Token:", data.token);
        this.authService.login(data.token);
        this.router.navigate(["/products"])
      },
      error: (err) => {
        console.log("Login Error:", err.error.message);
        this.errormes = err.error.message;
      }
    });
  }
}
