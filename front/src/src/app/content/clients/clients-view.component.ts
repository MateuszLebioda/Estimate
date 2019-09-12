import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddClientComponent} from './add-client/add-client.component';
import {ClientService} from '../../services/client.service';
import {Client} from '../../model/client';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet, private clientService: ClientService) {
    this.clients = new Array<Client>();
  }

  clients: Array<Client>;

  ngOnInit() {
    this.clientService.getAllClient().subscribe(response => {
      this.clients = response.body;
    });
  }

  addNewClient() {
    this.addSheet.open(AddClientComponent);
  }

  OnMatCardClickEvent(client: Client) {

  }
}
