import { Component, OnInit } from '@angular/core';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';

@Component({
  selector: 'app-unit-content',
  templateUrl: './unit-content.component.html',
  styleUrls: ['./unit-content.component.scss']
})
export class UnitContentComponent implements OnInit {

  materialUnits = new Array<Unit>();
  workUnits = new Array<Unit>();

  constructor(private unitService: UnitService) { }

  ngOnInit() {
    this.unitService.getAlWorkUnits().subscribe(u => {
      this.workUnits = u.body;
    });

    this.unitService.getAllMaterialUnits().subscribe(u => {
      this.materialUnits = u.body;
    });

  }

}
