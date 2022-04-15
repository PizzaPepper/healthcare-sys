import { Component, OnInit, OnDestroy } from '@angular/core';
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
  
  private id: any;

  constructor(
    private _router: Router,
    private _act: ActivatedRoute,
  ) {
    this.getPerson();
  }

  ngOnInit(): void {
    this.id = setInterval(() => {
      this.animationLoading();
    }, 500);

    setTimeout(() => {
      this._router.navigate(["/query"]);
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

  animationLoading(): void {
    this.load.endsWith('...') ? (this.load = 'Cargando') : (this.load += '.');
  }
}
