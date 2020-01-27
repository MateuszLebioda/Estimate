import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {WorkTemplate} from '../../../model/template/work-template';
import {AddWorkSheetComponent} from '../add-work-sheet/add-work-sheet.component';

@Component({
  selector: 'app-work-toolbar',
  templateUrl: './work-toolbar.component.html',
  styleUrls: ['./work-toolbar.component.scss']
})
export class WorkToolbarComponent implements OnInit {


  @Output()
  workToAdd = new EventEmitter<WorkTemplate>();

  @Output()
  filter = new EventEmitter<string>();

  constructor(private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  addNewWork() {
    this.addSheet.open(AddWorkSheetComponent).afterDismissed().subscribe((work: WorkTemplate) => {
        if (work !== undefined) {
          this.workToAdd.emit(work);
        }
      }
    );
  }

  filterMaterials(changed: string) {
    this.filter.emit(changed);
  }
}
