import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MaterialTemplate} from '../../../model/template/material-template';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddMaterialSheetComponent} from '../add-material-sheet/add-material-sheet.component';
import {ReportsService} from '../../../services/reports.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-material-toolbar',
  templateUrl: './material-toolbar.component.html',
  styleUrls: ['./material-toolbar.component.scss']
})
export class MaterialToolbarComponent implements OnInit {

  @Output()
  materialToAdd = new EventEmitter<MaterialTemplate>();

  @Output()
  filter = new EventEmitter<string>();

  constructor(private addSheet: MatBottomSheet, private reportsService: ReportsService) {
  }

  ngOnInit() {
  }

  addNewMaterial() {
    this.addSheet.open(AddMaterialSheetComponent).afterDismissed().subscribe((material: MaterialTemplate) => {
        if (material !== undefined) {
          this.materialToAdd.emit(material);
        }
      }
    );
  }

  filterMaterials(changed: string) {
    this.filter.emit(changed);
  }

  generatePrice() {
    this.reportsService.generateMaterialsPriceListReport();
  }
}
