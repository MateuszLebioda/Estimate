import {Component, OnInit} from '@angular/core';
import {Unit} from '../../model/unit';
import {UnitService} from '../../services/unit.service';

@Component({
  selector: 'app-unit',
  templateUrl: './units-view.component.html',
  styleUrls: ['./units-view.component.scss']
})
export class UnitViewsComponent implements OnInit {

  materialUnits = new Array<Unit>();
  workUnits = new Array<Unit>();

  constructor(private unitService: UnitService) {
  }

  ngOnInit() {
    this.unitService.getAlWorkUnits().subscribe(u => {
      this.workUnits = u.body;
    });

    this.unitService.getAllMaterialUnits().subscribe(u => {
      this.materialUnits = u.body;
    });
  }

  addUnit(unit: Unit) {
    this.unitService.addUnit(unit).subscribe(u => {
      unit.id = u.body;
      // @ts-ignore
      if (unit.role === 'MATERIAL') {
        this.materialUnits.push(unit);
      } else {
        this.workUnits.push(unit);
      }
    });
  }

  deleteWorksUnit(unit: Unit) {
    this.unitService.deleteUnit(unit).subscribe(s => {
      this.workUnits = this.workUnits.filter(w => w !== unit);
    });
  }

  deleteMaterialUnit(unit: Unit) {
    this.unitService.deleteUnit(unit).subscribe(s => {
      this.materialUnits = this.materialUnits.filter(w => w !== unit);
    });
  }
}
