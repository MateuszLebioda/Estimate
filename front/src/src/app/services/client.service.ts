import {Injectable} from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Client} from '../model/client';
import {backEndUrl} from '../utils/static';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public getAllClient(): Observable<HttpResponse<Client[]>> {
    return this.http.get<Client[]>(backEndUrl + '/client/getAll', {observe: 'response'});
  }

  public addClient(client: Client): Observable<HttpResponse<object>> {
    return this.http.post(backEndUrl + '/client/add', client, {observe: 'response'});
  }
}
