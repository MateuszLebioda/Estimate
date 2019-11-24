import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Material} from '../../../model/material';
import {UnitSheetComponentComponent} from '../../units/unit-sheet-component/unit-sheet-component.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddMaterialSheetComponent} from '../add-material-sheet/add-material-sheet.component';

@Component({
  selector: 'app-material-toolbar',
  templateUrl: './material-toolbar.component.html',
  styleUrls: ['./material-toolbar.component.scss']
})
export class MaterialToolbarComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet) {
  }

  @Output()
  materialToAdd = new EventEmitter<Material>();

  ngOnInit() {
  }

  addNewMaterial() {
    this.addSheet.open(AddMaterialSheetComponent).afterDismissed().subscribe((material: Material) => {
        if (material !== undefined) {
          this.materialToAdd.emit(material);
        }
      }
    );
  }
}
