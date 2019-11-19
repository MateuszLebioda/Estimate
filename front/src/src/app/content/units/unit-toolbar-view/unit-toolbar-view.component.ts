import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {UnitSheetComponentComponent} from '../unit-sheet-component/unit-sheet-component.component';
import {Unit} from '../../../model/unit';

@Component({
  selector: 'app-unit-toolbar-view',
  templateUrl: './unit-toolbar-view.component.html',
  styleUrls: ['./unit-toolbar-view.component.scss']
})
export class UnitToolbarViewComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet) {
  }

  @Output()
  unitToAdd = new EventEmitter<Unit>();

  ngOnInit() {
  }

  addNewUnit() {
    this.addSheet.open(UnitSheetComponentComponent).afterDismissed().subscribe((unit: Unit) => {
      if (unit !== undefined) {
        this.unitToAdd.emit(unit);
      }
      }
    );
  }

}
