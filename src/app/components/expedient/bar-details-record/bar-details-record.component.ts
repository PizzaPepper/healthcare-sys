import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-bar-details-record',
  templateUrl: './bar-details-record.component.html',
  styleUrls: ['./bar-details-record.component.css'],
  animations:[
    trigger('rotatedState', [
      state('default', style({ transform: 'rotate(270deg)' })),
      state('rotated', style({ transform: 'rotate(90deg)' })),
      transition('rotated => default', animate('400ms ease-out')),
      transition('default => rotated', animate('400ms ease-out')),
    ]),
    trigger('pop', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(200)]),
      transition('* => void', [animate(200, style({ opacity: 0 }))]),
    ]),
  ]
})
export class BarDetailsRecordComponent implements OnInit {
  @Input() currentUser: string='';
  @Output() returnRecord = new EventEmitter<void>();
  public stateRecord: string = 'default';
  constructor() { }

  ngOnInit(): void {
  }

  returnRecords(): void {
    this.returnRecord.emit()
  }

  toggleRecord(): void {
    this.stateRecord = this.stateRecord === 'default' ? 'rotated' : 'default';
  }
}
