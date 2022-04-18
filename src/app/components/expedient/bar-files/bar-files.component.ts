import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import filePatient from 'src/app/models/File';
import { ExpedientService } from 'src/app/services/expedient.service';

@Component({
  selector: 'app-bar-files',
  templateUrl: './bar-files.component.html',
  styleUrls: ['./bar-files.component.css'],
  animations: [
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
export class BarFilesComponent implements OnInit {
  @Input() currentUser: string='';
  @Input() files!:Array<filePatient>;

  public isUploading: boolean =false;

  public stateFile: string = 'default';

  public filterFile: string =
  'image/png, image/jpeg, audio/mp3, video/mp4, application/pdf application/zip, application/x-rar-compressed';



    
  constructor(
    private _act: ActivatedRoute,
    private _expedient: ExpedientService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }


  onFileSelected(event: any): void {
    const idExp: string|null = this._act.snapshot.paramMap.get('id');

    const file: File = event.target.files[0];

    const formData:FormData = new FormData();

    formData.append('fileuploading',file);

    this.isUploading=true;
    this._expedient.uploadFile(idExp!,formData).subscribe({
      next: (res:any) => {
        this.toastr.success('Archivo subido correctamente');
        this.isUploading=false;
        this.files.push(res);
      },
      error: (err) => {
        this.toastr.error('Error al subir el archivo');
        this.isUploading=false;
      }
    })
  }

  changeLoading(isLoading: Boolean): void {
    
  }

  getNiceNameFile(name: string, type: string): string {
    const limit: number = 12;
    if (name.length<limit) return name+'.'+type;
    
    return name.substring(0,limit)+'.'+type;
  }

  toggleFile(): void {
    this.stateFile = this.stateFile === 'default' ? 'rotated' : 'default';
  }

  redirectToExternalPage(url: string): void {
    window.location.href = url;
  }
}
