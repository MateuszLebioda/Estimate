import { Component, OnInit } from '@angular/core';
import {Unit} from '../../../model/unit';
import {UnitService} from '../../../services/unit.service';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hidden-units',
  templateUrl: './hidden-units.component.html',
  styleUrls: ['./hidden-units.component.scss']
})
export class HiddenUnitsComponent implements OnInit {
  units: Array<Unit>;

  constructor(private unitService: UnitService, public dialog: MatDialog, private rote: Router) {
  }

  ngOnInit() {
    this.unitService.getHiddenUnits().subscribe(u => {
      this.units = u.body;
    });
  }

  displayUnit(unit: Unit) {
    this.unitService.displayUnit(unit).subscribe();
    this.units = this.units.filter(w => w !== unit);
  }
}
