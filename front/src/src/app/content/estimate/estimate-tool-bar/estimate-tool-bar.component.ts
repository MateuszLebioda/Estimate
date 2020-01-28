import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddNewEstimateSheetComponent} from '../add-new-estimate-sheet/add-new-estimate-sheet.component';
import {JobTemplate} from '../../../model/template/job-template';
import {ServiceTemplate} from '../../../model/template/service-template';
import {Unit} from '../../../model/unit';
import {Client} from '../../../model/client';
import {Estimate} from '../../../model/estimate';

@Component({
  selector: 'app-estimate-tool-bar',
  templateUrl: './estimate-tool-bar.component.html',
  styleUrls: ['./estimate-tool-bar.component.scss']
})
export class EstimateToolBarComponent implements OnInit {

  @Output()
  filter = new EventEmitter<string>();

  @Output()
  estimateEmitter = new EventEmitter<Estimate>();

  @Input()
  jobTemplates: Array<JobTemplate>;

  @Input()
  serviceTemplates: Array<ServiceTemplate>;

  @Input()
  materialTemplates: Array<ServiceTemplate>;

  @Input()
  units: Array<Unit>;

  @Input()
  clients: Array<Client>;

  constructor(private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  openAddDialog() {
    this.addSheet.open(AddNewEstimateSheetComponent,
      {
        data: {
          jobTemplates: this.jobTemplates,
          serviceTemplates: this.serviceTemplates,
          materialTemplates: this.materialTemplates,
          units: this.units,
          clients: this.clients,
          estimate: null
        },
        panelClass: 'estimateAddSheet'
      },
    ).afterDismissed().subscribe(estimate => {
      if(estimate !== undefined) {
        this.estimateEmitter.emit(estimate);
      }
    });
  }


  filterMaterials(changed: string) {
    this.filter.emit(changed);
  }
}
