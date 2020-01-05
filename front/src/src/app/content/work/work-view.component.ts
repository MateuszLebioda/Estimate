import { Component, OnInit } from '@angular/core';
import {Work} from '../../model/work';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WorkService} from '../../services/work.service';
import {Material} from '../../model/material';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {AddMaterialSheetComponent} from '../material/add-material-sheet/add-material-sheet.component';
import {AddWorkSheetComponent} from './add-work-sheet/add-work-sheet.component';

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss']
})
export class WorkViewComponent implements OnInit {

  works: Array<Work>;

  constructor(private addSheet: MatBottomSheet, public dialog: MatDialog, private snackBar: MatSnackBar, private workService: WorkService) {
  }

  ngOnInit() {
    this.workService.getAllWorks().subscribe(works => {
      this.works = works.body;
    });
  }

  private openSnackBar(work: Work, action: string) {
    this.snackBar.open(work.name, action, {
      duration: 2000
    });
  }

  addWork(work: Work) {
    this.workService.addWork(work).subscribe(workId => {
      work.id = workId.body;
      this.works.push(work);
    });
  }

  onMatCardClickEvent(work: Work) {
    this.dialog.open((SimpleComponentDialogComponent), {
      data: work.name
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.workService.delete(work).subscribe(o => {
          this.openSnackBar(work, 'Usunięto');
          this.works = this.works.filter(m => m.id !== work.id);
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(AddWorkSheetComponent, {
          data: work
        }).afterDismissed().subscribe((m: Work) => {
            if (m !== undefined) {
              console.log(m);
              this.workService.put(m).subscribe(http => {
                console.log(http.body);
                this.openSnackBar(work, 'Zaktualizowano');
              });
            }
          }
        );
      }
    });
  }
}
