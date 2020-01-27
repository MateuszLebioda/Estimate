import {Component, Input, OnInit} from '@angular/core';
import {MaterialTemplate} from '../../model/template/material-template';
import {MaterialService} from '../../services/material.service';
import {DialogClientComponent} from '../clients/dialog-client/dialog-client.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {AddMaterialSheetComponent} from './add-material-sheet/add-material-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ClientSheetComponent} from '../clients/sheet-client/client-sheet.component';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss']
})
export class MaterialViewComponent implements OnInit {

  materials: Array<MaterialTemplate>;

  constructor(private addSheet: MatBottomSheet, public dialog: MatDialog, private snackBar: MatSnackBar, private materialService: MaterialService) {
  }

  private openSnackBar(material: MaterialTemplate, action: string) {
    this.snackBar.open(material.name, action, {
      duration: 2000
    });
  }

  ngOnInit() {
    this.materialService.getAllMaterials().subscribe(materials => {
      this.materials = materials.body;
    });
  }

  addMaterial(material: MaterialTemplate) {
    this.materialService.addMaterial(material).subscribe(materialId => {
      material.id = materialId.body;
      this.materials.push(material);
    });
  }

  onMatCardClickEvent(material: MaterialTemplate) {
    this.dialog.open((SimpleComponentDialogComponent), {
      data: material.name
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.materialService.delete(material).subscribe(o => {
          this.openSnackBar(material, 'Usunięto');
          this.materials = this.materials.filter(m => m.id !== material.id);
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(AddMaterialSheetComponent, {
          data: material
        }).afterDismissed().subscribe((m: MaterialTemplate) => {
            if (m !== undefined) {
              console.log(m);
              this.materialService.put(m).subscribe(http => {
                console.log(http.body);
                this.openSnackBar(material, 'Zaktualizowano');
              });
            }
          }
        );
      }
    });
  }
}
