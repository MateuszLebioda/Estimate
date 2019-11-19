import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unit-toolbar-view',
  templateUrl: './unit-toolbar-view.component.html',
  styleUrls: ['./unit-toolbar-view.component.scss']
})
export class UnitToolbarViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addNewUnit() {
    console.log('działa');
  }
}
