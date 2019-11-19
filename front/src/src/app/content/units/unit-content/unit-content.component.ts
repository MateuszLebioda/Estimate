import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unit} from '../../../model/unit';

@Component({
  selector: 'app-unit-content',
  templateUrl: './unit-content.component.html',
  styleUrls: ['./unit-content.component.scss']
})
export class UnitContentComponent implements OnInit {

  @Input()
  materialUnits: Array<Unit>;

  @Input()
  workUnits: Array<Unit>;

  @Output()
  materialUnitDelete = new EventEmitter<Unit>();

  @Output()
  workUnitDelete = new EventEmitter<Unit>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteWorksUnit(unit: Unit) {
    this.workUnitDelete.emit(unit);
  }

  deleteMaterialUnit(unit: Unit) {
    this.materialUnitDelete.emit(unit);
  }
}
