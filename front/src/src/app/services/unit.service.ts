import {Injectable} from '@angular/core';
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

  public getAllUnits(): Observable<HttpResponse<Unit[]>> {
    return this.http.get<Unit[]>(backEndUrl + '/unit/getAllUnits', {observe: 'response'});
  }

  public getDisplayedUnits(): Observable<HttpResponse<Unit[]>> {
    return this.http.get<Unit[]>(backEndUrl + '/unit/getDisplayedUnits', {observe: 'response'});
  }

  public getHiddenUnits(): Observable<HttpResponse<Unit[]>> {
    return this.http.get<Unit[]>(backEndUrl + '/unit/getHiddenUnits', {observe: 'response'});
  }

  public deleteUnit(unit: Unit): Observable<HttpResponse<boolean>> {
    return this.http.delete<boolean>(backEndUrl + '/unit/delete/' + unit.id, {observe: 'response'});
  }

  public addUnit(unit: Unit): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/unit/add/', unit, {observe: 'response'});
  }

  public hideUnit(unit: Unit): Observable<HttpResponse<void>> {
    return this.http.put<void>(backEndUrl + '/unit/hide/' + unit.id, {}, {observe: 'response'});
  }

  public displayUnit(unit: Unit): Observable<HttpResponse<void>> {
    return this.http.put<void>(backEndUrl + '/unit/display/' + unit.id, {}, {observe: 'response'});
  }
}
