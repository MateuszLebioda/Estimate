import {Component, EventEmitter, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {JobTemplate} from '../../model/template/job-template';
import {SnackBarServiceService} from '../../services/snack-bar-service.service';

@Component({
  selector: 'app-add-job-template-dialog-component',
  templateUrl: './add-job-template-dialog-component.component.html',
  styleUrls: ['./add-job-template-dialog-component.component.scss']
})
export class AddJobTemplateDialogComponentComponent implements OnInit {

  emitter = new EventEmitter<JobTemplate>();
  jobTemplates = new Array<JobTemplate>();
  filteredJobTemplates = new Array<JobTemplate>();

  filter = '';

  constructor(public dialogRef: MatDialogRef<AddJobTemplateDialogComponentComponent>,
              private snackService: SnackBarServiceService,
              @Inject(MAT_DIALOG_DATA) public data: Array<JobTemplate>) {
    this.jobTemplates = data;
    for (const jobTemplate of this.jobTemplates) {
      this.filteredJobTemplates.push(jobTemplate);
    }
  }

  ngOnInit() {
  }

  filterMethod() {
    this.filteredJobTemplates = this.jobTemplates.filter(m => m.name.toLocaleLowerCase().includes(this.filter.toLocaleLowerCase()));
  }

  close() {
    this.dialogRef.close();
  }

  handleEmitter(jobTemplate: JobTemplate) {
    this.jobTemplates = this.jobTemplates.filter(m => m.id !== jobTemplate.id);
    this.filterMethod();
    this.snackService.openSnackBar(jobTemplate.name, 'Dodano')
    this.emitter.emit(jobTemplate);
  }



}
