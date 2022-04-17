import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import Person from 'src/app/models/Person';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resume-exp',
  templateUrl: './resume-exp.component.html',
  styleUrls: ['./resume-exp.component.css'],
})
export class ResumeExpComponent implements OnInit {
  @Input() onSelectPerson!: Person|null;
  @Output() returnList = new EventEmitter<void>();
  constructor(private _router:Router) {}

  ngOnInit(): void {}

  onReturnList(): void {
    this.returnList.emit();
  }

  goToExpedient(): void {
    this._router.navigate(['expedient', this.onSelectPerson!.expedient]);
  }
}
