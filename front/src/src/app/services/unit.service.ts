import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {Unit} from '../model/unit';

@Injectable({
  providedIn: 'root'
})
export class UnitService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public getAllMaterialUnits(): Observable<HttpResponse<Unit[]>> {
    return this.http.get<Unit[]>(backEndUrl + '/unit/getAllMaterialsUnits', {observe: 'response'});
  }

  public getAlWorkUnits(): Observable<HttpResponse<Unit[]>> {
    return this.http.get<Unit[]>(backEndUrl + '/unit/getAllWorkUnits', {observe: 'response'});
  }

  public deleteUnit(unit: Unit): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/unit/delete/' + unit.id, {observe: 'response'});
  }

  public addUnit(unit: Unit): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/unit/add/', unit, {observe: 'response'});
  }
}