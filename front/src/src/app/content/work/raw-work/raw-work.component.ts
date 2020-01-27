import {Component, Input, OnInit} from '@angular/core';
import {WorkTemplate} from '../../../model/template/work-template';

@Component({
  selector: 'app-raw-work',
  templateUrl: './raw-work.component.html',
  styleUrls: ['./raw-work.component.scss']
})
export class RawWorkComponent implements OnInit {

  @Input() work: WorkTemplate;

  constructor() { }

  ngOnInit() {
  }

}
