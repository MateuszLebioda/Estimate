import {Component, OnInit} from '@angular/core';
import {Material} from '../../model/material';
import {MaterialService} from '../../services/material.service';

@Component({
  selector: 'app-material-view',
  templateUrl: './material-view.component.html',
  styleUrls: ['./material-view.component.scss']
})
export class MaterialViewComponent implements OnInit {

  materials: Array<Material>;

  constructor(private materialService: MaterialService) {
  }

  ngOnInit() {
  }

  addMaterial(material: Material) {
    this.materialService.addMaterial(material).subscribe(materialId => {
      material.id = materialId.body;
    });
  }
}
