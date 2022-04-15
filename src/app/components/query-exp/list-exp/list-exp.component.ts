import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import Person from 'src/app/models/Person';
import { PersonService } from 'src/app/services/person.service';
import { isPositiveInteger } from 'src/app/utils/utils';

@Component({
  selector: 'app-list-exp',
  templateUrl: './list-exp.component.html',
  styleUrls: ['./list-exp.component.css'],
})
export class ListExpComponent implements OnInit, OnChanges {
  public patients?: Array<Person>;
  @Input() search: string;

  constructor(private _personService: PersonService) {
    this.search = '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updatePatients(this.search);
  }

  ngOnInit(): void {}

  updatePatients(filter: string = ''): void {
    this._personService.getPatients().subscribe({
      next: (data: Array<Person>) => {
        if (this.search === '') this.patients = data;

        if (isPositiveInteger(this.search))
          this.patients = data.filter((p) => p.expedient.includes(filter));
        else 
          this.patients = data.filter((p) => p.name.includes(filter));
      },
      error: () => (this.patients = []),
    });
  }
}
