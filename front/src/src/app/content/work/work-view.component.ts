import {Component, OnInit} from '@angular/core';
import {WorkTemplate} from '../../model/template/work-template';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {WorkService} from '../../services/work.service';
import {SimpleComponentDialogComponent} from '../../utils/simple-component-dialog/simple-component-dialog.component';
import {AddWorkSheetComponent} from './add-work-sheet/add-work-sheet.component';
import {MaterialTemplate} from '../../model/template/material-template';

@Component({
  selector: 'app-work-view',
  templateUrl: './work-view.component.html',
  styleUrls: ['./work-view.component.scss']
})
export class WorkViewComponent implements OnInit {

  works: Array<WorkTemplate>;

  filterMaterial = '';

  constructor(private addSheet: MatBottomSheet, public dialog: MatDialog, private snackBar: MatSnackBar, private workService: WorkService) {
  }

  ngOnInit() {
    this.workService.getAllWorks().subscribe(works => {
      this.works = works.body;
    });
  }

  private openSnackBar(work: WorkTemplate, action: string) {
    this.snackBar.open(work.name, action, {
      duration: 2000
    });
  }

  addWork(work: WorkTemplate) {
    this.workService.addWork(work).subscribe(workId => {
      work.id = workId.body;
      this.works.push(work);
    });
  }

  onMatCardClickEvent(work: WorkTemplate) {
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
        }).afterDismissed().subscribe((m: WorkTemplate) => {
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

  filter(filter: string) {
    this.filterMaterial = filter;
  }

  filterWorks(): Array<WorkTemplate> {
    if (this.works !== undefined) {
      if (this.filterMaterial === '') {
        return this.works.sort((a, b) => a.name.localeCompare(b.name));
      }
      return this.works.filter
      (m => m.name.toLocaleLowerCase().includes(this.filterMaterial.toLocaleLowerCase())).sort((a, b) => a.name.localeCompare(b.name));
    }
  }
}
