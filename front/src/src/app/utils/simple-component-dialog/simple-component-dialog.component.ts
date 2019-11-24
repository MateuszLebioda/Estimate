import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-simple-component-dialog',
  templateUrl: './simple-component-dialog.component.html',
  styleUrls: ['./simple-component-dialog.component.scss']
})
export class SimpleComponentDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<SimpleComponentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public value: string) {
  }

  ngOnInit() {
  }

  edit() {
    this.dialogRef.close('edit');
  }

  delete() {
    this.dialog.open((ConfirmDialogComponent)).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'yes') {
        this.dialogRef.close('deleted');
      }
    });
  }
}
