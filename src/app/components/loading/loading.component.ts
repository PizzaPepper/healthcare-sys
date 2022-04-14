import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  constructor(
    private _router:Router,
    private _arouter:ActivatedRoute
    ) { 
      console.log(this._router.getCurrentNavigation()?.extras.state)
    }

  ngOnInit(): void {
    console.log(this._router.getCurrentNavigation()?.extras.state)
    // console.log(history.state.personState);
  }

}
