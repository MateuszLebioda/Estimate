import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Client} from '../model/client';
import {backEndUrl} from '../utils/static';

@Injectable({
  providedIn: 'root'
})
export class RandomServiceService {

  constructor(private http: HttpClient) {
  }

  public getRandomNumber(): Observable<HttpResponse<number>> {
    return this.http.get<number>(backEndUrl + '/random', {observe: 'response'});
  }

}
