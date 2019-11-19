import {Component, Input, OnInit} from '@angular/core';
import {Unit} from '../../../model/unit';

@Component({
  selector: 'app-unit-list',
  templateUrl: './unit-list.component.html',
  styleUrls: ['./unit-list.component.scss']
})
export class UnitListComponent implements OnInit {

  constructor() { }

  @Input() units: Array<Unit>;
  @Input() title: string;

  ngOnInit() {
  }

}
