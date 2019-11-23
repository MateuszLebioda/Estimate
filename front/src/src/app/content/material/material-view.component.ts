import { Component, OnInit } from '@angular/core';
import {Material} from '../../model/material';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss']
})
export class MaterialViewComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  addMaterial(material: Material) {

  }
}
