import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddClientComponent} from './add-client/add-client.component';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import {DialogClientComponent} from './dialog-client/dialog-client.component';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet, private clientService: ClientService, public dialog: MatDialog) {
    this.clients = new Array<Client>();
  }

  clients: Array<Client>;

  ngOnInit() {
    this.getAllClients();
  }

  addNewClient() {
    this.addSheet.open(AddClientComponent).afterDismissed().subscribe((reload) => {
      if (reload !== undefined) {
        this.clients.push(reload);
      }
    });
  }

  onMatCardClickEvent(client: Client) {
    this.dialog.open((DialogClientComponent), {
      data: client
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.clients.forEach((c, i) => {
          if (c === client) {
            this.clients.splice(i, 1);
          }
        });
      }

    });
  }

  private getAllClients(): void {
    this.clientService.getAllClient().subscribe(response => {
      this.clients = response.body;
    });
  }
}
