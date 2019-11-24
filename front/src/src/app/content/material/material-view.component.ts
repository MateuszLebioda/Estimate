import {Component, Input, OnInit} from '@angular/core';
import {Material} from '../../model/material';
import {MaterialService} from '../../services/material.service';
import {DialogClientComponent} from '../clients/dialog-client/dialog-client.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss']
})
export class MaterialViewComponent implements OnInit {

  materials: Array<Material>;

  constructor(public dialog: MatDialog, private snackBar: MatSnackBar, private materialService: MaterialService) {
  }

  private openSnackBar(material: Material, action: string) {
    this.snackBar.open(material.name, action, {
      duration: 2000
    });
  }

  ngOnInit() {
    this.materialService.getAllMaterials().subscribe( materials => {
      console.log(materials.body);

      this.materials = materials.body;
    });
  }

  addMaterial(material: Material) {
    this.materialService.addMaterial(material).subscribe(materialId => {
      material.id = materialId.body;
      this.materials.push(material);
    });
  }

  onMatCardClickEvent(material: Material) {
    this.dialog.open((SimpleComponentDialogComponent), {
      data: material.name
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.openSnackBar(material, 'Usunięto');
      }
      if (reload !== undefined && reload === 'edit') {
        this.openSnackBar(material, 'Zaktualizowano');
      }
    });
  }
}
