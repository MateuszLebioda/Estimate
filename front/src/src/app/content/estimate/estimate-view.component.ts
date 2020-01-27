import {Component, OnInit} from '@angular/core';
import {EstimateService} from '../../services/estimate.service';
import {WorkTemplate} from '../../model/template/work-template';
import {MaterialTemplate} from '../../model/template/material-template';
import {JobTemplate} from '../../model/template/job-template';
import {Unit} from '../../model/unit';
import {MaterialService} from '../../services/material.service';
import {WorkService} from '../../services/work.service';
import {UnitService} from '../../services/unit.service';
import {JobTemplateService} from '../../services/job-template.service';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client';
import {Estimate} from '../../model/estimate';
import {SnackBarServiceService} from '../../services/snack-bar-service.service';
import {DialogService} from '../../services/dialog.service';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddNewEstimateSheetComponent} from './add-new-estimate-sheet/add-new-estimate-sheet.component';

@Component({
  selector: 'app-estimate-view',
  templateUrl: './estimate-view.component.html',
  styleUrls: ['./estimate-view.component.scss']
})
export class EstimateViewComponent implements OnInit {

  workTemplates: Array<WorkTemplate>;
  estimates: Array<Estimate>;
  materialTemplates: Array<MaterialTemplate>;
  jobTemplates: Array<JobTemplate>;
  clients: Array<Client>;
  units = new Array<Unit>();

  constructor(private estimateService: EstimateService,
              private materialService: MaterialService,
              private workService: WorkService,
              private unitService: UnitService,
              private clientService: ClientService,
              private jobTemplateService: JobTemplateService,
              private snackBar: SnackBarServiceService,
              public dialog: MatDialog,
              private addSheet: MatBottomSheet,
              private dialogService: DialogService) {
  }

  ngOnInit() {
    this.initData();
    this.estimateService.getAll().subscribe(r => {
      console.log(r.body);
    });
  }

  initData() {
    this.jobTemplateService.getJobTemplates().subscribe(response => {
      this.jobTemplates = response.body;
    });

    this.workService.getAllWorks().subscribe(response => {
      this.workTemplates = response.body;
    });

    this.materialService.getAllMaterials().subscribe(response => {
      this.materialTemplates = response.body;
    });

    this.unitService.getAllUnits().subscribe(response => {
      this.units = response.body;
    });

    this.clientService.getAllClient().subscribe(response => {
      this.clients = response.body;
    });

    this.estimateService.getAll().subscribe(response => {
      this.estimates = response.body;
    });
  }

  saveNewEstimate(estimate: Estimate) {
    this.estimateService.add(estimate).subscribe(response => {
      this.estimates.push(response.body);
      this.snackBar.openSnackBar(estimate.name, 'Dodano');
    });
  }

  estimateClick(event: MouseEvent, estimate: Estimate) {
    console.log(estimate);
    if (!((event.target) as Element).className.includes('expandIcon')) {
        this.dialog.open((SimpleComponentDialogComponent), {
          data: estimate.name
        }).afterClosed().subscribe(reload => {
          if (reload !== undefined && reload === 'deleted') {
            this.estimateService.delete(estimate).subscribe(o => {
              this.snackBar.openSnackBar(estimate.name, 'Usunięto');
              this.estimates = this.estimates.filter(jT => jT.id !== estimate.id);
            });
          }
          if (reload !== undefined && reload === 'edit') {
            this.addSheet.open(AddNewEstimateSheetComponent, {
              data: {
                jobTemplates: this.jobTemplates,
                workTemplates: this.workTemplates,
                materialTemplates: this.materialTemplates,
                units: this.units,
                clients: this.clients,
                estimate
              },
              panelClass: 'jobTemplateAddSheet'
            }).afterDismissed().subscribe((estimateToUpdate: Estimate) => {
                if (estimateToUpdate !== undefined) {
                  this.estimateService.update(estimateToUpdate).subscribe(http => {
                    const index = this.estimates.indexOf(estimate);
                    this.estimates[index] = http.body;
                    this.snackBar.openSnackBar(estimateToUpdate.name, 'Zaktualizowano');
                  });
                }
              }
            );
          }
        });
    }
  }
}
