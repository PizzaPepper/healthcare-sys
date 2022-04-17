import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {
  private title:string="Inicio Sesion";
  public user:User;
  public isLogging:boolean;

  constructor(
    private _userService:AuthService,
    private _router:Router,
    private _titleService: Title,
    ) { 
      this._titleService.setTitle(this.title);
    this.user = new User('','');
    this.isLogging=false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    //Check data
    this._userService.signIn(this.user)
      .subscribe({
      next:(token)=>{
        localStorage.setItem('token',token);
        this._router.navigate(['/loading']);
      },
      error:(err)=>{
        console.error(err);
        form.reset();
      }
    });
  }
}

