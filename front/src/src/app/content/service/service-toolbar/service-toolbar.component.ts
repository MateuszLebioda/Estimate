import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ServiceTemplate} from '../../../model/template/service-template';
import {AddServiceSheetComponent} from '../add-service-sheet/add-service-sheet.component';

@Component({
  selector: 'app-service-toolbar',
  templateUrl: './service-toolbar.component.html',
  styleUrls: ['./service-toolbar.component.scss']
})
export class ServiceToolbarComponent implements OnInit {


  @Output()
  serviceToAdd = new EventEmitter<ServiceTemplate>();

  @Output()
  filter = new EventEmitter<string>();

  constructor(private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  addNewService() {
    this.addSheet.open(AddServiceSheetComponent).afterDismissed().subscribe((serviceTemplate: ServiceTemplate) => {
        if (serviceTemplate !== undefined) {
          this.serviceToAdd.emit(serviceTemplate);
        }
      }
    );
  }

  filterMaterials(changed: string) {
    this.filter.emit(changed);
  }
}
