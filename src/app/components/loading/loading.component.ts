import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit {
  public name?:string;
  public role?:string;

  constructor(private _router: Router, private _person: PersonService) {
    this.getPerson();
  }

  ngOnInit(): void {}

  getPerson(): void {
    this._person.getPerson().subscribe({
      next: (data) => {
        this.name= data.name;
        this.role= data.role
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  getImgRole(): string {
    switch (this.role) {
      case 'doctor':
        return 'nurse-Checked.svg';
      case 'pacient':
        return 'user-Checked.svg';
      default:
        return '';
    }
  }

  animationLoading():void {
    
  }
}
