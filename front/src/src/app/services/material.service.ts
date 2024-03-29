import {Injectable} from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {MaterialTemplate} from '../model/template/material-template';
import {ServiceTemplate} from '../model/template/service-template';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addMaterial(material: MaterialTemplate): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/materials/addMaterial', {
      name: material.name,
      unit: material.unit,
      price: material.price
    }, {observe: 'response'});
  }

  public getAllMaterials(): Observable<HttpResponse<MaterialTemplate[]>> {
    return this.http.get<MaterialTemplate[]>(backEndUrl + '/materials/getAllMaterials', {observe: 'response'});
  }

  public getHideMaterials(): Observable<HttpResponse<MaterialTemplate[]>> {
    return this.http.get<MaterialTemplate[]>(backEndUrl + '/materials/getHideMaterials', {observe: 'response'});
  }

  public getDisplayedMaterials(): Observable<HttpResponse<MaterialTemplate[]>> {
    return this.http.get<MaterialTemplate[]>(backEndUrl + '/materials/getDisplayedMaterials', {observe: 'response'});
  }

  public delete(material: MaterialTemplate): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/materials/deleteMaterial/' + material.id, {observe: 'response'});
  }

  public put(material: MaterialTemplate): Observable<HttpResponse<number>> {
    return this.http.put<number>(backEndUrl + '/materials/updateMaterialTemplate', material, {observe: 'response'});
  }

  public hideMaterial(materialTemplate: MaterialTemplate): Observable<HttpResponse<void>> {
    return this.http.put<void>(backEndUrl + '/materials/hide/' + materialTemplate.id, {}, {observe: 'response'});
  }

  public displayMaterial(materialTemplate: MaterialTemplate): Observable<HttpResponse<void>> {
    return this.http.put<void>(backEndUrl + '/materials/display/' + materialTemplate.id, {}, {observe: 'response'});
  }
}
