import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Unit} from '../../model/unit';

@Component({
  selector: 'app-hide-dialog',
  templateUrl: './hide-dialog.component.html',
  styleUrls: ['./hide-dialog.component.scss']
})
export class HideDialogComponent implements OnInit {

  constructor(public dialog: MatDialog, public dialogRef: MatDialogRef<HideDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data:
                {
                  unit: Unit,
                  value: string
                }) {
  }

  ngOnInit() {
    if (this.data.value) {
      this.resizable(document.getElementById('container'), this.data.value);
    } else if (this.data.unit) {
      this.resizable(document.getElementById('container'), 'Ponieważ jest używany w innym miejscu');
    }


  }

  resizable(el, factor: string) {
    el.style.width = (factor.length * 11.5) + 'px';
  }

  hide() {
    this.dialogRef.close(true);
  }

  dontHide() {
    this.dialogRef.close(false);
  }
}
