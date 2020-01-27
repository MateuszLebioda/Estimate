import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddJobTemplateSheetComponent} from '../add-job-template-sheet/add-job-template-sheet.component';
import {JobTemplate} from '../../../model/template/job-template';

@Component({
  selector: 'app-job-template-toolbar',
  templateUrl: './job-template-toolbar.component.html',
  styleUrls: ['./job-template-toolbar.component.scss']
})
export class JobTemplateToolbarComponent implements OnInit {

  @Output()
  jobTemplateToAdd = new EventEmitter<JobTemplate>();

  @Output()
  filter = new EventEmitter<string>();

  constructor(private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  addNewJobTemplate() {
    this.addSheet.open(AddJobTemplateSheetComponent,
      {panelClass: 'jobTemplateAddSheet'})
      .afterDismissed().subscribe((jobTemplateToAdd: JobTemplate) => {
        if (jobTemplateToAdd !== undefined) {
          this.jobTemplateToAdd.emit(jobTemplateToAdd);
        }
      }
    );
  }

  filterMaterials(changed: string) {
    this.filter.emit(changed);
  }
}
