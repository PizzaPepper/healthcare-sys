import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-query-exp',
  templateUrl: './query-exp.component.html',
  styleUrls: ['./query-exp.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(0deg)' })),
      state('rotated', style({ transform: 'rotate(360deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-out')),
    ])
    
  ],
})
export class QueryExpComponent implements OnInit {
  public name: string;
  public search: string;

  public state: string="default";

  constructor(private _act: ActivatedRoute, private _auth: AuthService) {
    this.name = 'Dr. Who';
    this.search = '';
    this.InitData();
  }

  ngOnInit(): void {}

  InitData(): void {
    this._act.data.subscribe({
      next: (cres) => {
        const data = cres['cres'];
        this.name = data.name;
      },
    });
  }

  setSearch(event: any): void {
    this.search = event.target.value;
  }

  logOut(): void {
    this._auth.logOut();
  }

  reload(): void {
    this.search = '';
    this.state = (this.state === 'default' ? 'rotated' : 'default');
  }
}
