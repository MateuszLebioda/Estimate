import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public x(): Observable<HttpResponse<object>> {
    return this.http.get('http://localhost:8080/estimate/client/clients', {observe: 'response'});
  }
}
