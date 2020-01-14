import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {Work} from '../../../model/work';
import {AddWorkSheetComponent} from '../add-work-sheet/add-work-sheet.component';

@Component({
  selector: 'app-work-toolbar',
  templateUrl: './work-toolbar.component.html',
  styleUrls: ['./work-toolbar.component.scss']
})
export class WorkToolbarComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet) {
  }

  @Output()
  workToAdd = new EventEmitter<Work>();

  ngOnInit() {
  }

  addNewWork() {
    this.addSheet.open(AddWorkSheetComponent).afterDismissed().subscribe((work: Work) => {
        if (work !== undefined) {
          this.workToAdd.emit(work);
        }
      }
    );
  }
}
