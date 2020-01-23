import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SnackBarServiceService} from './snack-bar-service.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog, public snackBarService: SnackBarServiceService) { }


}
