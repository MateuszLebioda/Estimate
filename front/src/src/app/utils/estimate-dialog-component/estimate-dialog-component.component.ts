import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ConfirmDialogComponent} from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-estimate-dialog-component',
  templateUrl: './estimate-dialog-component.component.html',
  styleUrls: ['./estimate-dialog-component.component.scss']
})
export class EstimateDialogComponentComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<EstimateDialogComponentComponent>,
              @Inject(MAT_DIALOG_DATA) public value: string) {
  }

  ngOnInit() {
    this.resizable(document.getElementById('container'), this.value);
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

  resizable(el, factor: string) {
    el.style.width = (factor.length * 11.5) + 'px';
  }

  generatePDF() {
    this.dialogRef.close('generate');
  }

}
