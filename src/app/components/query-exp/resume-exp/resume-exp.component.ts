import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import Person from 'src/app/models/Person';
import { Router } from '@angular/router';
import { ExpedientService } from 'src/app/services/expedient.service';
import { ToastrService } from 'ngx-toastr';
import { HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-resume-exp',
  templateUrl: './resume-exp.component.html',
  styleUrls: ['./resume-exp.component.css'],
})
export class ResumeExpComponent implements OnInit, OnDestroy {
  @Input() onSelectPerson!: Person | null;
  @Output() returnList = new EventEmitter<void>();

  private waiting: any;
  public stateAccess: string = 'loading';

  constructor(
    private _router: Router,
    private _expedientService: ExpedientService,
    private _auth: AuthService,
    private toastr: ToastrService
  ) {}
  ngOnDestroy(): void {
    clearInterval(this.waiting);
  }

  ngOnInit(): void {
    this.getStatus();
  }

  onReturnList(): void {
    this.returnList.emit();
  }

  goToExpedient(): void {
    this._router.navigate(['expedient', this.onSelectPerson!.expedient]);
  }

  // ! @deprecated
  waitRequest(): void {
    const popup: any = document.querySelector('.overlay');
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;

    this._expedientService
      .putStatus(this.onSelectPerson!.expedient)
      .subscribe();

    this.waiting = setInterval(() => {
    
            if (this.stateAccess == 'accepted') {
              clearInterval(this.waiting);

              this._expedientService.putStatus(this.onSelectPerson!.expedient).subscribe({
                next: (res) => {
                  const token: any = res.headers.get('X-Token');
                  this._auth.addTokenExp(token);
                  this.onCloseWait();
                  this.goToExpedient();
                }
              });
            }
          
    }, 5000);
  }

  onCloseWait(): void {
    const popup: any = document.querySelector('.overlay');
    popup.style.visibility = 'hidden';
    popup.style.opacity = 0;

    this._expedientService
      .putStatusDefault(this.onSelectPerson!.expedient)
      .subscribe();

    clearInterval(this.waiting);
  }

  getStatus(): void {
    this.waiting = setInterval(() => {
      this._expedientService
        .getStatus(this.onSelectPerson!.expedient)
        .subscribe({
          next: (status: any) => {
            this.stateAccess = status;
          },
          error: (err: any) => {
            this._expedientService
              .putStatusDefault(this.onSelectPerson!.expedient)
              .subscribe();
            clearInterval(this.waiting);
            this.toastr.error('Something went wrong');
          },
        });
    }, 5000);
  }

  requestAccess(): void {
    if (this.stateAccess === 'loading') {
      this.toastr.error('Be patient dammit!');
      return;
    }
    if (this.stateAccess === 'waiting' || this.stateAccess === 'pending') {
      this.toastr.info('Is already requested');

      return;
    }
    if (this.stateAccess === 'accepted') {
      this._expedientService
        .putStatus(this.onSelectPerson!.expedient)
        .subscribe({
          next: (res) => {
            const token: any = res.headers.get('X-Token');
            this._auth.addTokenExp(token);
            this.goToExpedient();
          },
        });

      return;
    }

    this.stateAccess = 'loading';

    this._expedientService.putStatus(this.onSelectPerson!.expedient).subscribe({
      next: (status: any) => {
        this.toastr.success(status.body);
      },
      error: (err: any) => {
        this.toastr.error('Something went wrong');
        this.stateAccess = 'waiting';
        clearInterval(this.waiting);
      },
    });
  }
}
