import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ServiceService} from '../../../services/service.service';
import {ServiceTemplate} from '../../../model/template/service-template';

@Component({
  selector: 'app-hidden-service',
  templateUrl: './hidden-service.component.html',
  styleUrls: ['./hidden-service.component.scss']
})
export class HiddenServiceComponent implements OnInit {

  private services = new Array<ServiceTemplate>();

  constructor(private addSheet: MatBottomSheet,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private serviceService: ServiceService) {
  }

  ngOnInit() {
    this.serviceService.getHideServices().subscribe(services => {
      this.services = services.body;
    });
  }

  displayService(service: ServiceTemplate) {
    this.serviceService.displayService(service).subscribe();
    this.services = this.services.filter(w => w !== service);
  }
}
