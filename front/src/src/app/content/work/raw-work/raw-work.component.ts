import {Component, Input, OnInit} from '@angular/core';
import {Work} from '../../../model/work';

@Component({
  selector: 'app-raw-work',
  templateUrl: './raw-work.component.html',
  styleUrls: ['./raw-work.component.scss']
})
export class RawWorkComponent implements OnInit {

  @Input() work: Work;

  constructor() { }

  ngOnInit() {
  }

}
