import {Component, Inject} from '@angular/core';
import {MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../../../model/client';

@Component({
  selector: 'app-add-client',
  templateUrl: './client-sheet.component.html',
  styleUrls: ['./client-sheet.component.scss']
})
export class ClientSheetComponent {

  constructor(private bottomSheetRef: MatBottomSheetRef<ClientSheetComponent>,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: Client) {
    bottomSheetRef.disableClose = true;
    if (data !== null) {
      this.edit = true;
      this.client = data;
    } else {
      this.edit = false;
      this.client = new Client();
    }
    this.clientForm = new FormGroup({
      firstName: new FormControl(this.client.firstName, [Validators.required]),
      lastName: new FormControl(this.client.lastName, [Validators.required]),
      email: new FormControl(this.client.email, [Validators.email]),
      city: new FormControl(this.client.city, ),
      street: new FormControl(this.client.street, ),
      houseNumber: new FormControl(this.client.houseNumber),
      code: new FormControl(this.client.code, [Validators.pattern('[0-9]{2}-[0-9]{3}')]),
    });
  }

  private edit: boolean;
  client: Client;
  private clientForm: FormGroup;

  saveClient() {
    this.client.firstName = this.clientForm.get('firstName').value;
    this.client.lastName = this.clientForm.get('lastName').value;
    this.client.email = this.clientForm.get('email').value;
    this.client.city = this.clientForm.get('city').value;
    this.client.street = this.clientForm.get('street').value;
    this.client.houseNumber = this.clientForm.get('houseNumber').value;
    this.client.code = this.clientForm.get('code').value;
    this.bottomSheetRef.dismiss(this.client);
  }
}
