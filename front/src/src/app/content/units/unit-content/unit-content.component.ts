import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Unit} from '../../../model/unit';

@Component({
  selector: 'app-unit-content',
  templateUrl: './unit-content.component.html',
  styleUrls: ['./unit-content.component.scss']
})
export class UnitContentComponent implements OnInit {

  @Input()
  units: Array<Unit>;
  @Input()
  iconName: string;
  @Input()
  hidden: boolean;
  @Output()
  unitDelete = new EventEmitter<Unit>();

  constructor() {
  }

  ngOnInit() {
  }

  deleteUnit(unit: Unit) {
    this.unitDelete.emit(unit);
  }

}
