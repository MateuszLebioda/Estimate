import {Injectable} from '@angular/core';
import {KeyCloakService} from '../utils/key-cloak-service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {backEndUrl} from '../utils/static';
import {Material} from '../model/material';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private keyCloakService: KeyCloakService, private http: HttpClient) {
  }

  public addMaterial(material: Material): Observable<HttpResponse<number>> {
    return this.http.post<number>(backEndUrl + '/materials/addMaterial', {
      name: material.name,
      unit: material.unit,
      price: material.price
    }, {observe: 'response'});
  }

  public getAllMaterials(): Observable<HttpResponse<Material[]>> {
    return this.http.get<Material[]>(backEndUrl + '/materials/getAllMaterials', {observe: 'response'});
  }

  public delete(material: Material): Observable<HttpResponse<object>> {
    return this.http.delete(backEndUrl + '/materials/deleteMaterial/' + material.id, {observe: 'response'});
  }

  public put(material: Material): Observable<HttpResponse<number>> {
    return this.http.put<number>(backEndUrl + '/materials/updateMaterial', material, {observe: 'response'});
  }
}
