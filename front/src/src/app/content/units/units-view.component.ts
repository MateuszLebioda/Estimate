import {Component, OnInit} from '@angular/core';
import {Unit} from '../../model/unit';
import {UnitService} from '../../services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './units-view.component.html',
  styleUrls: ['./units-view.component.scss']
})
export class UnitViewsComponent implements OnInit {

  units = new Array<Unit>();

  constructor(private unitService: UnitService) {
  }

  ngOnInit() {
    this.unitService.getAllUnits().subscribe(u => {
      this.units = u.body;
    });
  }

  addUnit(unit: Unit) {
    this.unitService.addUnit(unit).subscribe(u => {
      unit.id = u.body;
      // @ts-ignore
      this.units.push(unit);
    });
  }

  deleteUnit(unit: Unit) {
    this.unitService.deleteUnit(unit).subscribe(s => {
      this.units = this.units.filter(w => w !== unit);
    });
  }

}
