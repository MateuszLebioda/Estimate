import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() iconName: string;
  @Output() unitToDelete = new EventEmitter<Unit>();

  ngOnInit() {
  }

  deleteUnit(unit: Unit) {
    this.unitToDelete.emit(unit);
  }
}
