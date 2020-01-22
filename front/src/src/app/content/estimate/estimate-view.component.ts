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
              private jobTemplateService: JobTemplateService) {
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
      console.log(response.body);
    });
  }
}
