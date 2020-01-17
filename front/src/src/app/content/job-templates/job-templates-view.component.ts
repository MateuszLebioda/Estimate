import {Component, OnInit} from '@angular/core';
import {JobTemplateService} from '../../services/job-template.service';
import {JobTemplate} from '../../model/template/job-template';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddJobTemplateSheetComponent} from './add-job-template-sheet/add-job-template-sheet.component';

@Component({
  selector: 'app-job-templates-view',
  templateUrl: './job-templates-view.component.html',
  styleUrls: ['./job-templates-view.component.scss']
})
export class JobTemplatesViewComponent implements OnInit {

  jobTemplates = new Array<JobTemplate>();

  constructor(private jobTemplateService: JobTemplateService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar,
              private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
    this.jobTemplateService.getJobTemplates().subscribe(response => {
      this.jobTemplates = response.body;
    });
  }

  private openSnackBar(jobTemplate: JobTemplate, action: string) {
    this.snackBar.open(jobTemplate.name, action, {
      duration: 2000
    });
  }

  openDialog(jobTemplate: JobTemplate) {
    this.dialog.open((SimpleComponentDialogComponent), {
      data: jobTemplate.name
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.jobTemplateService.delete(jobTemplate).subscribe(o => {
          this.openSnackBar(jobTemplate, 'Usunięto');
          this.jobTemplates = this.jobTemplates.filter(jT => jT.id !== jobTemplate.id);
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(AddJobTemplateSheetComponent, {
          data: jobTemplate,
          panelClass: 'jobTemplateAddSheet'
        }).afterDismissed().subscribe((jobTemplateToEdit: JobTemplate) => {
            if (jobTemplateToEdit !== undefined) {
              this.jobTemplateService.put(jobTemplateToEdit).subscribe(http => {
                const index = this.jobTemplates.indexOf(jobTemplate);
                this.jobTemplates[index] = http.body;
                this.openSnackBar(jobTemplateToEdit, 'Zaktualizowano');
              });
            }
          }
        );
      }
    });
  }

  handleEmitter($event: JobTemplate) {
    this.openDialog($event);
  }

  addJobTemplate(jobTemplate: JobTemplate) {
    this.jobTemplateService.addJobTemplate(jobTemplate).subscribe(response => {
        jobTemplate.id = response.body;
        this.jobTemplates.push(jobTemplate);
      }
    );
  }
}
