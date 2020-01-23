import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractMaterial} from '../../model/template/abstract-material';


@Component({
  selector: 'app-add-abstract-material-dialog',
  templateUrl: './add-abstract-material-dialog.component.html',
  styleUrls: ['./add-abstract-material-dialog.component.scss']
})
export class AddAbstractMaterialDialogComponent implements OnInit {

  materials = new Array<AbstractMaterial>();
  filteredMaterials = new Array<AbstractMaterial>();

  emmmiter = new EventEmitter<AbstractMaterial>();

  filter = '';

  constructor(public dialogRef: MatDialogRef<AddAbstractMaterialDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: Array<AbstractMaterial>) {
    this.materials = data;
    for (const material of this.materials) {
      this.filteredMaterials.push(material);
    }
  }

  ngOnInit() {
  }

  filterMethod() {
    this.filteredMaterials = this.materials.filter(m => m.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
  }

  emmitMaterial(material: AbstractMaterial) {
    //this.materials = this.materials.filter(m => m.id !== material.id);
    this.filterMethod();
    this.emmmiter.emit(material);
  }

  close() {
    this.dialogRef.close();
  }
}
