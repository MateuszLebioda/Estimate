import {Component, OnInit} from '@angular/core';
import {Unit} from '../../model/unit';
import {UnitService} from '../../services/unit.service';
import {HideDialogComponent} from '../../utils/hide-dialog/hide-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-unit',
  templateUrl: './units-view.component.html',
  styleUrls: ['./units-view.component.scss']
})
export class UnitViewsComponent implements OnInit {

  units = new Array<Unit>();

  constructor(private unitService: UnitService, public dialog: MatDialog, private rote: Router) {
  }

  ngOnInit() {
    this.unitService.getDisplayedUnits().subscribe(u => {
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
      if (s.body === true) {
        this.units = this.units.filter(w => w !== unit);
      } else {
        this.dialog.open(HideDialogComponent, {data: {unit: unit}})
          .afterClosed().subscribe((result: boolean) => {
          if (result) {
            this.unitService.hideUnit(unit).subscribe();
            this.units = this.units.filter(w => w !== unit);
          }
        });
      }
    });
  }

  navigateToHidden($event: boolean) {
    this.rote.navigate(['/unitsHidden']);
  }
}
