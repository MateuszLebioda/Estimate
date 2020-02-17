import {Component, Input, OnInit} from '@angular/core';
import {MaterialTemplate} from '../../model/template/material-template';
import {MaterialService} from '../../services/material.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {AddMaterialSheetComponent} from './add-material-sheet/add-material-sheet.component';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {HideDialogComponent} from '../../utils/hide-dialog/hide-dialog.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss']
})
export class MaterialViewComponent implements OnInit {

  materials: Array<MaterialTemplate>;

  filterMaterial = '';

  constructor(private addSheet: MatBottomSheet,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private materialService: MaterialService,
              private rote: Router) {
  }

  private openSnackBar(material: MaterialTemplate, action: string) {
    this.snackBar.open(material.name, action, {
      duration: 2000
    });
  }

  ngOnInit() {
    this.materialService.getDisplayedMaterials().subscribe(materials => {
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
          if (o.body) {
            this.openSnackBar(material, 'Usunięto');
            this.materials = this.materials.filter(m => m.id !== material.id);
          } else {
            this.dialog.open(HideDialogComponent, {data: {value: material.name}})
              .afterClosed().subscribe((result: boolean) => {
              if (result) {
                this.materialService.hideMaterial(material).subscribe();
                this.materials = this.materials.filter(w => w !== material);
              }
            });
          }
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(AddMaterialSheetComponent, {
          data: material
        }).afterDismissed().subscribe((m: MaterialTemplate) => {
            if (m !== undefined) {
              this.materialService.put(m).subscribe(http => {
                this.openSnackBar(material, 'Zaktualizowano');
              });
            }
          }
        );
      }
    });
  }

  filter(filter: string) {
    this.filterMaterial = filter;
  }

  filterMaterials(): Array<MaterialTemplate> {
    if (this.materials !== undefined) {
      if (this.filterMaterial === '') {
        return this.materials.sort((a, b) => a.name.localeCompare(b.name));
      }
      return this.materials.filter
      (m => m.name.toLocaleLowerCase().includes(this.filterMaterial.toLocaleLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
    }
  }

  navigateToHide() {
    this.rote.navigate(['/materialsHidden']);
  }
}
