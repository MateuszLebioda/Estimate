import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarServiceService {

  constructor(private snackBar: MatSnackBar) { }

  public openSnackBar(name: string, action: string) {
    this.snackBar.open(name, action, {
      duration: 2000
    });
  }
}
