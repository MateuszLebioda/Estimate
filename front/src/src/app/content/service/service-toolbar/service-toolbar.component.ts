import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ServiceTemplate} from '../../../model/template/service-template';
import {AddServiceSheetComponent} from '../add-service-sheet/add-service-sheet.component';
import {ReportsService} from '../../../services/reports.service';


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

  @Output()
  navigateToHidden = new EventEmitter<boolean>();

  constructor(private addSheet: MatBottomSheet, private reportsService: ReportsService) {
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

  generatePrice() {
    this.reportsService.generateServicePriceListReport();
  }

  goToHidden() {
    this.navigateToHidden.emit(true);
  }
}
