import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Expedient from 'src/app/models/Expedient';
import { AuthService } from 'src/app/services/auth.service';
import { ExpedientService } from 'src/app/services/expedient.service';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.css'],
})
export class ExpedientComponent implements OnInit {
  public exp!: Expedient;

  public currentUser: string = '';
  private title: string = 'Expediente';

  constructor(
    private _act: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
    private _auth: AuthService,
    private _expedientService: ExpedientService
  ) {
    this._titleService.setTitle(this.title);
  }

  

  ngOnInit(): void {
    this.InitData();
  }

  InitData(): void {
    this._act.data.subscribe({
      next: (cres) => {
        const data: any = cres['cres'];
        this.currentUser = data.first.role;
        delete data['_id'];
        this.exp = new Expedient(
          data.second.patient,
          data.second.records,
          data.second.files,
          data.second.requestAccess
        );
      },
    });
  }

  returnPage(): void {
    if (this.currentUser === 'patient') {
      this._auth.logOut();
    } else if (this.currentUser === 'doctor') {
      this._router.navigate(['/query']);
    }
  }

  acceptRequest(): void {
    const idExp:any = this._act.snapshot.paramMap.get('id');

    this._expedientService.putStatus(idExp).subscribe({
      next: (res) => {
        this.exp.statusAccess = 'default';
      },
      error: (err) => {
        this.exp.statusAccess = 'default';
      }
    });
  }

  

  
}
