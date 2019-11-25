import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Material} from '../model/material';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {Work} from '../model/work';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addWork(work: Work): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/materials/addWorks', {
      name: work.name,
      unit: work.unit,
      price: work.price
    }, {observe: 'response'});
  }

  public getAllWorks(): Observable<HttpResponse<Work[]>> {
    return this.http.get<Work[]>(backEndUrl + '/materials/getAllWorks', {observe: 'response'});
  }

  public delete(work: Work): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/materials/deleteWork/' + work.id, {observe: 'response'});
  }

  public put(work: Work): Observable<HttpResponse<number>> {
    return this.http.put<number>(backEndUrl + '/materials/update', work, {observe: 'response'});
  }
}
