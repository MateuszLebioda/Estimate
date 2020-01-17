import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MaterialTemplate} from '../model/template/material-template';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {WorkTemplate} from '../model/template/work-template';

@Injectable({
  providedIn: 'root'
})
export class WorkService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addWork(work: WorkTemplate): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/materials/addWorks', {
      name: work.name,
      unit: work.unit,
      price: work.price
    }, {observe: 'response'});
  }

  public getAllWorks(): Observable<HttpResponse<WorkTemplate[]>> {
    return this.http.get<WorkTemplate[]>(backEndUrl + '/materials/getAllWorks', {observe: 'response'});
  }

  public delete(work: WorkTemplate): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/materials/deleteWork/' + work.id, {observe: 'response'});
  }

  public put(work: WorkTemplate): Observable<HttpResponse<number>> {
    return this.http.put<number>(backEndUrl + '/materials/updateWorkTemplate', work, {observe: 'response'});
  }
}
