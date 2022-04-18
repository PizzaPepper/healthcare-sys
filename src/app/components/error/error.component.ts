import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common'

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent implements OnInit {
  private title: string = 'Error';

  constructor(
    private titleService: Title,
    private _location: Location,
    ) {
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {}


  onReturn(): void {
    this._location.back();
  }
}
