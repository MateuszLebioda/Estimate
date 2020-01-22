import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {Estimate} from '../model/estimate';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public add(estimate: Estimate): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/estimate/add', estimate, {observe: 'response'});
  }

  public getAll(): Observable<HttpResponse<Array<Estimate>>> {
    return this.http.get<Array<Estimate>>(backEndUrl + '/estimate/getAll', {observe: 'response'});
  }
}
