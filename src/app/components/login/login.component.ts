import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Person from 'src/app/models/Person';
import User from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
  public user:User;
  public personLogged?:Person;
  public isLogging:boolean;

  constructor(
    private _userService:UserService,
    private _router:Router
    ) { 
    this.user = new User('','','');
    this.isLogging=false;
  }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    //Check data
    this._userService.login(this.user)
      .subscribe({
      next:(res)=>{
        this.personLogged = new Person(
          res.body._id,
          res.body.username,
          res.body.password,
          res.body.name,
          res.body.fsurname,
          res.body.lsurname,
          res.body.age,
          res.body.role
        );
          this._router.navigate(['/loading'],{state:{personState:this.personLogged}});
      },
      error:(err)=>{
        console.error(err);
        form.reset();
      }
    });
  }
}

