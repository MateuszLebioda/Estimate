import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../../model/client';
import {ClientService} from '../../../services/client.service';

@Component({
  selector: 'app-dialog-client',
  templateUrl: './dialog-client.component.html',
  styleUrls: ['./dialog-client.component.scss']
})
export class DialogClientComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogClientComponent>,
              private clientService: ClientService,
              @Inject(MAT_DIALOG_DATA) public client: Client) {

  }

  private editClient() {
    this.dialogRef.close('edit');
  }

  private deleteClient(): void {
    this.clientService.delete(this.client).subscribe(response => {
      this.dialogRef.close('deleted');
    }, (error) => {
      console.log(error);
    });
  }

  resizable(el, factor: string) {
    el.style.width = (factor.length * 15) + 'px';
  }

  ngOnInit(): void {
    this.resizable(document.getElementById('container'), this.client.lastName + this.client.firstName + 1);
  }

}
