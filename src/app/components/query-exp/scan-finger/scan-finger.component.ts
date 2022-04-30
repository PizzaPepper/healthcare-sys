import { Component, Input, OnInit } from '@angular/core';
import Person from 'src/app/models/Person';
import { ExpedientService } from 'src/app/services/expedient.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-scan-finger',
  templateUrl: './scan-finger.component.html',
  styleUrls: ['./scan-finger.component.css'],
})
export class ScanFingerComponent implements OnInit {
  @Input() ExpId?: string = '';
  
  constructor(
    private _expedientService: ExpedientService,
    private _userService: PersonService
  ) {}

  ngOnInit(): void {
  }

  acceptRequest(): void {

    let patientId:string='';

    this._userService.getPatients().subscribe({
      next: (patients:Array<Person>) => {
        patients.forEach(patient=>{
          if(patient.expedient===this.ExpId){
            patientId=patient._id;
          }
        })

        this._expedientService.putStatusFromPatient(this.ExpId!)
        .subscribe({
          error: (error)=>{
            this._expedientService.putStatusDefault(this.ExpId!).subscribe();
          }
        })        

      }
    })

    
  }
}
