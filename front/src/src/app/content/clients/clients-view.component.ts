import {Component, OnInit} from '@angular/core';
import {MatBottomSheet, MatBottomSheetRef} from '@angular/material/bottom-sheet';
import {AddClientComponent} from './add-client/add-client.component';
import {ClientService} from '../../services/client.service';

@Component({
  selector: 'app-clients-view',
  templateUrl: './clients-view.component.html',
  styleUrls: ['./clients-view.component.scss']
})
export class ClientsViewComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet, private clientService: ClientService) {

  }

  ngOnInit() {

  }

  addNewClient() {
    this.addSheet.open(AddClientComponent);
  }

}
