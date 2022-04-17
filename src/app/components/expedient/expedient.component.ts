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
import { getNiceTime } from 'src/app/utils/utils';

@Component({
  selector: 'app-expedient',
  templateUrl: './expedient.component.html',
  styleUrls: ['./expedient.component.css'],
  animations: [
    // Each unique animation requires its own trigger. The first argument of the trigger function is the name
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
  ],
})
export class ExpedientComponent implements OnInit {
  public exp!: Expedient;

  public currentUser: string = '';
  public stateRecord: string = 'default';
  public stateFile: string = 'rotated';
  public filterFile: string =
    'image/png, image/jpeg, audio/mp3, video/mp4, application/pdf application/zip, application/x-rar-compressed';

  private title: string = 'Expediente';

  constructor(
    private _act: ActivatedRoute,
    private _router: Router,
    private _titleService: Title,
    private _auth: AuthService,
    private _expedient: ExpedientService
  ) {
    this._titleService.setTitle(this.title);
  }

  onFileSelected(event: any): void {
    const idExp: string|null = this._act.snapshot.paramMap.get('id');

    const file: File = event.target.files[0];

    const formData:FormData = new FormData();

    formData.append('fileuploading',file);

    //* TODO: Show a loading spinner or something
    this._expedient.uploadFile(idExp!,formData).subscribe({
      next: (res) => {
        alert('Archivo subido con éxito');
        //* TODO: Show a message of success and update the list of files
      },
      error: (err) => {
        alert('Error al subir el archivo');
        //* TODO: Show a message of error
      }
    })


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
          data.second.files
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

  toggleRecord(): void {
    this.stateRecord = this.stateRecord === 'default' ? 'rotated' : 'default';
  }

  toggleFile(): void {
    this.stateFile = this.stateFile === 'default' ? 'rotated' : 'default';
  }

  getNiceTime(time: Date): string {
    return getNiceTime(time);
  }

  getNiceNameFile(name: string, type: string): string {
    const limit: number = 12;
    if (name.length<limit) return name+'.'+type;
    
    return name.substring(0,limit)+'.'+type;
  }

  redirectToExternalPage(url: string): void {
    window.location.href = url;
  }
}
