import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css'],
})
export class LoadingComponent implements OnInit, OnDestroy {
  public name?: string;
  public role?: string;
  public load: string = 'Cargando';
  
  
  private exp?:string;
  private id: any;

  constructor(
    private _router: Router,
    private _act: ActivatedRoute,
    private _titleService: Title,
  ) {
    this.getPerson();
    this._titleService.setTitle(this.load);
  }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.animationLoading();
    }, 500);

    setTimeout(() => {
      if(this.role==="doctor"){
        this._router.navigate(["/query"]);
      }else if(this.role==="patient"){
        this._router.navigate(["/expedient/",this.exp]);
      }
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.id) {
      clearInterval(this.id);
    }
  }

  getPerson(): void {
    this._act.data.subscribe({
      next: (cres) => {
        const data = cres['cres'];
        this.name = data.name;
        this.role = data.role;
        this.exp = data.expedient;
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
      case 'patient':
        return 'user-Checked.svg';
      default:
        return '';
    }
  }

  animationLoading(): void {
    this.load.endsWith('...') ? (this.load = 'Cargando') : (this.load += '.');
  }
}
