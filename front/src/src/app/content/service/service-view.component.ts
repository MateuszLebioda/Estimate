import {Component, OnInit} from '@angular/core';
import {ServiceTemplate} from '../../model/template/service-template';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServiceService} from '../../services/service.service';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {AddServiceSheetComponent} from './add-service-sheet/add-service-sheet.component';

@Component({
  selector: 'app-service-view',
  templateUrl: './service-view.component.html',
  styleUrls: ['./service-view.component.scss']
})
export class ServiceViewComponent implements OnInit {

  services: Array<ServiceTemplate>;

  filterMaterial = '';

  constructor(private addSheet: MatBottomSheet,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.serviceService.getAllServices().subscribe(services => {
      this.services = services.body;
    });
  }

  private openSnackBar(serviceTemplate: ServiceTemplate, action: string) {
    this.snackBar.open(serviceTemplate.name, action, {
      duration: 2000
    });
  }

  addService(serviceTemplate: ServiceTemplate) {
    this.serviceService.addService(serviceTemplate).subscribe(serviceId => {
      serviceTemplate.id = serviceId.body;
      this.services.push(serviceTemplate);
    });
  }

  onMatCardClickEvent(serviceTemplate: ServiceTemplate) {
    this.dialog.open((SimpleComponentDialogComponent), {
      data: serviceTemplate.name
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.serviceService.delete(serviceTemplate).subscribe(o => {
          this.openSnackBar(serviceTemplate, 'Usunięto');
          this.services = this.services.filter(m => m.id !== serviceTemplate.id);
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(AddServiceSheetComponent, {
          data: serviceTemplate
        }).afterDismissed().subscribe((m: ServiceTemplate) => {
            if (m !== undefined) {
              console.log(m);
              this.serviceService.put(m).subscribe(http => {
                console.log(http.body);
                this.openSnackBar(serviceTemplate, 'Zaktualizowano');
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

  filterServices(): Array<ServiceTemplate> {
    if (this.services !== undefined) {
      if (this.filterMaterial === '') {
        return this.services.sort((a, b) => a.name.localeCompare(b.name));
      }
      return this.services.filter
      (m => m.name.toLocaleLowerCase().includes(this.filterMaterial.toLocaleLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
