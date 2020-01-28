import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {AbstractMaterial} from '../../model/template/abstract-material';
import {AbstractMaterialType} from '../../model/abstract-material-type.enum';
import {ServiceTemplate} from '../../model/template/service-template';
import {MaterialTemplate} from '../../model/template/material-template';


@Component({
  selector: 'app-add-abstract-material-dialog',
  templateUrl: './add-abstract-material-dialog.component.html',
  styleUrls: ['./add-abstract-material-dialog.component.scss']
})
export class AddAbstractMaterialDialogComponent implements OnInit {

  materials = new Array<AbstractMaterial>();
  filteredMaterials = new Array<AbstractMaterial>();
  emptyService = false;
  emptyClass = null;

  emmmiter = new EventEmitter<AbstractMaterial>();

  filter = '';

  constructor(public dialogRef: MatDialogRef<AddAbstractMaterialDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:
                {
                  materials: Array<AbstractMaterial>,
                  returnEmptyService: boolean;
                  returnType: AbstractMaterialType
                }) {
    this.materials = data.materials;
    if (data.returnEmptyService === true) {
      this.emptyService = data.returnEmptyService;
      this.emptyClass = data.returnType;
    }
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
    this.materials = this.materials.filter(m => m.id !== material.id);
    this.filterMethod();
    this.emmmiter.emit(material);
  }

  close() {
    this.dialogRef.close();
  }

  generateStyle() {
    return {
      width: !this.emptyService ? 'calc(100% - 50px)' : 'calc(100% - 225px)',
    };
  }

  returnEmptyMaterial() {
    this.emmmiter.emit(this.emptyClass === AbstractMaterialType.SERVICE ? new ServiceTemplate() : new MaterialTemplate());
  }
}
