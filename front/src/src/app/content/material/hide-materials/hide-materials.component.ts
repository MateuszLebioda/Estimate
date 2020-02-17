import { Component, OnInit } from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MaterialTemplate} from '../../../model/template/material-template';
import {MaterialService} from '../../../services/material.service';

@Component({
  selector: 'app-hide-materials',
  templateUrl: './hide-materials.component.html',
  styleUrls: ['./hide-materials.component.scss']
})
export class HideMaterialsComponent implements OnInit {

  private materials = new Array<MaterialTemplate>();

  constructor(private addSheet: MatBottomSheet,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private materialService: MaterialService) {
  }

  ngOnInit() {
    this.materialService.getHideMaterials().subscribe(services => {
      this.materials = services.body;
    });
  }

  displayMaterial(material: MaterialTemplate) {
    this.materialService.displayMaterial(material).subscribe();
    this.materials = this.materials.filter(w => w !== material);
  }

}
