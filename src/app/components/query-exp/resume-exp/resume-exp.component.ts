import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Person from 'src/app/models/Person';
import { Router } from '@angular/router';
import { ExpedientService } from 'src/app/services/expedient.service';

@Component({
  selector: 'app-resume-exp',
  templateUrl: './resume-exp.component.html',
  styleUrls: ['./resume-exp.component.css'],
})
export class ResumeExpComponent implements OnInit {
  @Input() onSelectPerson!: Person | null;
  @Output() returnList = new EventEmitter<void>();

  private waiting: any;

  constructor(
    private _router: Router,
    private _expedientService: ExpedientService
  ) {}

  ngOnInit(): void {}

  onReturnList(): void {
    this.returnList.emit();
  }

  goToExpedient(): void {
    this._router.navigate(['expedient', this.onSelectPerson!.expedient]);
  }

  waitRequest(): void {
    const popup: any = document.querySelector('.overlay');
    popup.style.visibility = 'visible';
    popup.style.opacity = 1;

    this._expedientService
      .putStatus(this.onSelectPerson!.expedient)
      .subscribe();

    this.waiting = setInterval(() => {
      this._expedientService
        .getStatus(this.onSelectPerson!.expedient)
        .subscribe({
          next: (status: any) => {
            console.log(status);
            if (status == 'accepted') {
              clearInterval(this.waiting);

              this.onCloseWait();
              this.goToExpedient();
            }
          },
          error: (err: any) => {
            this.onCloseWait();
          },
        });
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
}
