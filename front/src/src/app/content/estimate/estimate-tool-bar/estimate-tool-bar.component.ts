import {Component, OnInit} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {AddNewEstimateSheetComponent} from '../add-new-estimate-sheet/add-new-estimate-sheet.component';

@Component({
  selector: 'app-estimate-tool-bar',
  templateUrl: './estimate-tool-bar.component.html',
  styleUrls: ['./estimate-tool-bar.component.scss']
})
export class EstimateToolBarComponent implements OnInit {

  constructor(private addSheet: MatBottomSheet) {
  }

  ngOnInit() {
  }

  openAddDialog() {
    this.addSheet.open(AddNewEstimateSheetComponent,
      {panelClass: 'estimateAddSheet'});
  }

}
