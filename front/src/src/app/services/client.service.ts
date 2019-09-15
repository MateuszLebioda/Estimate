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

  public addClient(client: Client): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/client/add', client, {observe: 'response'});
  }

  public delete(client: Client): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/client/delete/' + client.id, {observe: 'response'});
  }

  public put(client: Client): Observable<HttpResponse<object>> {
    return this.http.put(backEndUrl + '/client/update', client, {observe: 'response'});
  }
}
