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
import Person from 'src/app/models/Person';
import { Title } from '@angular/platform-browser';

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
    ]),
  ],
})
export class QueryExpComponent implements OnInit {
  public name: string = 'Dr. Who';
  public search: string = '';
  public person!: Person | null;
  
  public state: string = 'default';
  public searchAvailable: boolean = false;
  
  private title: string = 'Consulta Expedientes';

  constructor(
    private _act: ActivatedRoute,
    private _auth: AuthService,
    private _titleService: Title
  ) {
    this._titleService.setTitle(this.title);
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

  onKey(event: any): void {
    this.search = event.target.value;
  }

  logOut(): void {
    this._auth.logOut();
  }

  reload(): void {
    if (this.searchAvailable == false) {
      this.search = '';
      this.state = this.state === 'default' ? 'rotated' : 'default';
    }
  }
}
