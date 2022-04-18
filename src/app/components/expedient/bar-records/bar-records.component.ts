import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import Record from 'src/app/models/Record';

import { getNiceTime } from 'src/app/utils/utils';

@Component({
  selector: 'app-bar-records',
  templateUrl: './bar-records.component.html',
  styleUrls: ['./bar-records.component.css'],
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
export class BarRecordsComponent implements OnInit {
  @Input() currentUser: string='';
  @Input() records!:Array<Record>;
  
  public stateRecord: string = 'default';

  constructor() { }

  ngOnInit(): void {
  }

  getNiceTime(time: Date): string {
    return getNiceTime(time);
  }

  toggleRecord(): void {
    this.stateRecord = this.stateRecord === 'default' ? 'rotated' : 'default';
  }

  onWatchRecord(): void {
    alert('TODO: implementar');
  }
}
