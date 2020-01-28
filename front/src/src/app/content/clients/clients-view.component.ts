import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {ClientSheetComponent} from './sheet-client/client-sheet.component';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client';
import {MatDialog} from '@angular/material/dialog';
import {DialogClientComponent} from './dialog-client/dialog-client.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MaterialTemplate} from '../../model/template/material-template';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {


  constructor(private addSheet: MatBottomSheet,
              private clientService: ClientService,
              public dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }


  filterMaterial = '';
  clients: Array<Client>;

  ngOnInit() {
    this.getAllClients();
  }

  addNewClient() {
    this.addSheet.open(ClientSheetComponent).afterDismissed().subscribe((client: Client) => {
      if (client !== undefined) {
        this.clientService.addClient(client).subscribe(response => {
          client.id = response.body;
          this.openSnackBar(client, 'Dodano');
        }, error => {
          console.error('Cannot add user');
        });
        this.clients.push(client);
      }
    });
  }

  onMatCardClickEvent(client: Client) {
    this.dialog.open((DialogClientComponent), {
      data: client
    }).afterClosed().subscribe(reload => {
      if (reload !== undefined && reload === 'deleted') {
        this.openSnackBar(client, 'Usunięto');
        this.clients.forEach((c, i) => {
          if (c === client) {
            this.clients.splice(i, 1);
          }
        });
      }
      if (reload !== undefined && reload === 'edit') {
        this.addSheet.open(ClientSheetComponent, {
          data: client
        }).afterDismissed().subscribe(response => {
          if (response !== undefined) {
            this.openSnackBar(client, 'Zaktualizowano');
            this.clientService.put(client).subscribe(r => {
            });
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

  private openSnackBar(client: Client, action: string) {
    this.snackBar.open(client.firstName + ' ' + client.lastName, action, {
      duration: 2000
    });
  }

  filterClient(filter: string) {
    this.filterMaterial = filter;
  }

  filterClients(): Array<Client> {
    if (this.clients !== undefined) {
      if (this.filterMaterial === '') {
        return this.clients.sort((a, b) => a.firstName.concat(a.lastName).localeCompare(b.firstName.concat(b.lastName)));
      }
      return this.clients.filter
      (m => m.firstName.concat(' ', m.lastName).toLocaleLowerCase().includes(this.filterMaterial.toLocaleLowerCase()))
        .sort((a, b) => a.firstName.concat(a.lastName).localeCompare(b.firstName.concat(b.lastName)));
    }
  }
}
