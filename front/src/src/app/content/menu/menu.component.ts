import {Component, OnInit} from '@angular/core';
import {KeyCloakService} from '../../utils/key-cloak-service';
import {RandomServiceService} from '../../services/random-service.service';
import {interval, Observable} from 'rxjs';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  private num;

  constructor(private keyCloak: KeyCloakService, private randomService: RandomServiceService) {
  }

  ngOnInit() {
    const secondsCounter = interval(5000);
    secondsCounter.subscribe(x => {
      this.randomService.getRandomNumber().subscribe(z => {
        this.num = z.body;
      });
    });
  }

  logout() {
    this.keyCloak.logout();
  }
}
