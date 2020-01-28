import { Injectable } from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MaterialTemplate} from '../model/template/material-template';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {ServiceTemplate} from '../model/template/service-template';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addService(service: ServiceTemplate): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/materials/addService', {
      name: service.name,
      unit: service.unit,
      price: service.price
    }, {observe: 'response'});
  }

  public getAllServices(): Observable<HttpResponse<ServiceTemplate[]>> {
    return this.http.get<ServiceTemplate[]>(backEndUrl + '/materials/getAllServices', {observe: 'response'});
  }

  public delete(serviceTemplate: ServiceTemplate): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/materials/deleteService/' + serviceTemplate.id, {observe: 'response'});
  }

  public put(serviceTemplate: ServiceTemplate): Observable<HttpResponse<number>> {
    return this.http.put<number>(backEndUrl + '/materials/updateService', serviceTemplate, {observe: 'response'});
  }
}
